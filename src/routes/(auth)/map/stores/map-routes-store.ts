import { get, writable } from 'svelte/store';
import type { HydratedMapMarker } from './map-marker-store';

const mapRoutesStore = writable<HydratedMapMarker[]>([]);
const mapRoutesSubscribe = mapRoutesStore.subscribe;

const getMapRoutes = () => get(mapRoutesStore);
const addToMapRoutes = (items: HydratedMapMarker) => {
  mapRoutesStore.update((val) => {
    val.push(items);

    return val;
  });
};
const setMapRoutes = (items: HydratedMapMarker[]) => mapRoutesStore.set(items);
const clearMapRoutes = () => mapRoutesStore.set([]);

export { getMapRoutes, addToMapRoutes, setMapRoutes, clearMapRoutes, mapRoutesSubscribe };
