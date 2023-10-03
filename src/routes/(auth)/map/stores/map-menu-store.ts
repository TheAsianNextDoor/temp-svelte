import { get, writable } from 'svelte/store';

import type { HydratedMapMarker } from './map-marker-store';

/**
 * The selected map entity to display in the menu
 */
const selectedEntityStore = writable<HydratedMapMarker>();
const { subscribe: selectedEntitySubscribe } = selectedEntityStore;
const getSelectedEntity = () => get(selectedEntityStore);
const setSelectedEntity = (mapMarker: HydratedMapMarker) => {
  selectedEntityStore.set(mapMarker);
};

export { selectedEntitySubscribe, getSelectedEntity, setSelectedEntity };

/**
 * Map menu visibility flag
 */
const mapMenuStore = writable(true);
const { subscribe: mapMenuSubscribe } = mapMenuStore;

const isMapMenuVisible = () => get(mapMenuStore);
const hideMapMenu = () => {
  mapMenuStore.set(false);
};
const showMapMenu = () => {
  mapMenuStore.set(true);
};

export { mapMenuSubscribe, isMapMenuVisible, hideMapMenu, showMapMenu };
