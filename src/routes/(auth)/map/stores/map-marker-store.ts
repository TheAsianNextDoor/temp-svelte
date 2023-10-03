import { get, writable } from 'svelte/store';
import type { HydratedMapSite } from '../+page.server';
import {
  addMarkerToMap,
  removeMarkerFromMap,
  showAllMarkers,
  type Marker,
} from '../helpers/marker-utils';
import type { MapSite } from '../queries/retrieve-map-sites';
import type { MapPhase } from '../queries/retreive-phases-by-site';

export type HydratedMapMarker = {
  id: string;
  site: HydratedMapSite;
  marker: Marker;
};

/**
 * Base Hydrated Map Markers to have a baseline to filter from
 */
const baseHydratedMarkerStore = writable<HydratedMapMarker[]>([]);
const { subscribe: mapSiteSubscribe } = baseHydratedMarkerStore;

const addBaseHydratedMarker = (hydratedMarker: HydratedMapMarker) => {
  baseHydratedMarkerStore.update((mapMarkers) => {
    mapMarkers.push(hydratedMarker);
    return mapMarkers;
  });
};

const getBaseHydratedMarkers = () => get(baseHydratedMarkerStore);

export { mapSiteSubscribe, addBaseHydratedMarker, getBaseHydratedMarkers };

/**
 * Functions to filter the map
 */
export type FilterSiteConditionFunc = (site: MapSite) => boolean;
export type FilterPhaseConditionFunc = (phases: MapPhase) => boolean;
export type FilterType = 'site' | 'phase';
export type FilterConfig = {
  siteConditionFunc?: FilterSiteConditionFunc;
  phaseConditionFunc?: FilterPhaseConditionFunc;
  type: FilterType;
};
const filterConditionStore = writable<Record<string, FilterConfig>>({});
const { subscribe: filterConditionSubscribe } = filterConditionStore;

const getFilterConditionKeys = () => Object.keys(get(filterConditionStore));

const getFilterConditionFuncs = () => Object.values(get(filterConditionStore));

const addFilterConditionFunc = (
  filterName: string,
  filterConditionFunc: FilterSiteConditionFunc | FilterPhaseConditionFunc,
  filterType: FilterType,
) => {
  filterConditionStore.update((store) => {
    if (filterType === 'site') {
      store[filterName] = {
        siteConditionFunc: filterConditionFunc as FilterSiteConditionFunc,
        type: filterType,
      };
    }

    if (filterType === 'phase') {
      store[filterName] = {
        phaseConditionFunc: filterConditionFunc as FilterPhaseConditionFunc,
        type: filterType,
      };
    }

    return store;
  });
};

const removeFilterConditionFunc = (filterName: string) => {
  if (!getFilterConditionKeys().includes(filterName)) {
    return;
  }

  filterConditionStore.update((store) => {
    delete store[filterName];

    return store;
  });
};

const clearFilterConditionFuncs = () => {
  filterConditionStore.set({});
};

export {
  filterConditionSubscribe,
  addFilterConditionFunc,
  removeFilterConditionFunc,
  clearFilterConditionFuncs,
};

/**
 * Filtered Hydrated Map Markers
 */
const filteredHydratedMarkerStore = writable<HydratedMapMarker[]>([]);
const { subscribe: filteredMapMarkerSubscribe } = filteredHydratedMarkerStore;

const clearFilteredHydratedMarkers = () => {
  showAllMarkers();
  filteredHydratedMarkerStore.set(getBaseHydratedMarkers());
};

const setFilteredHydratedMarkers = (sites: HydratedMapMarker[]) => {
  filteredHydratedMarkerStore.set(sites);
};

const shouldShowMarker = (hydratedMarker: HydratedMapMarker) => {
  const conditionConfigs = getFilterConditionFuncs();

  const siteConfigs = conditionConfigs.filter(({ type }) => type === 'site');
  const phaseConfigs = conditionConfigs.filter(({ type }) => type === 'phase');

  const passesSiteConditions = siteConfigs.every(
    ({ siteConditionFunc }) => siteConditionFunc?.(hydratedMarker.site),
  );

  const passesPhaseConditions = hydratedMarker.site.phases.some((phase) =>
    phaseConfigs.every(({ phaseConditionFunc }) => phaseConditionFunc?.(phase)),
  );

  return passesSiteConditions && passesPhaseConditions;
};

const filterMapMarkers = () => {
  if (getFilterConditionFuncs().length === 0) {
    filteredHydratedMarkerStore.set(getBaseHydratedMarkers());
    showAllMarkers();

    return;
  }

  getBaseHydratedMarkers().filter((hydratedMarker) => {
    if (shouldShowMarker(hydratedMarker)) {
      addMarkerToMap(hydratedMarker.marker);

      return true;
    }

    removeMarkerFromMap(hydratedMarker.marker);

    return false;
  });
};

export {
  filteredMapMarkerSubscribe,
  clearFilteredHydratedMarkers,
  setFilteredHydratedMarkers,
  filterMapMarkers,
};
