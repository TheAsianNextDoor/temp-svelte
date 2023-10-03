import { get, writable } from 'svelte/store';
import type { Map } from '../helpers/marker-utils';

const mapStore = writable<Map>();
const { subscribe: mapStoreSubscribe, set: setMap } = mapStore;

const getMap = () => get(mapStore);

export { mapStoreSubscribe, setMap, getMap };
