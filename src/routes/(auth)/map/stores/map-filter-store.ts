import { get, writable } from 'svelte/store';
import { EQUALITY_ENUM } from '../helpers/equality-utils';

/**
 * Map filter visibility
 */
const mapFilterStore = writable(false);
const { subscribe: mapFilterSubscribe, set } = mapFilterStore;

const isMapFilterVisible = () => get(mapFilterStore);

const hideMapFilter = () => {
  set(false);
};
const showMapFilter = () => {
  set(true);
};

export { mapFilterSubscribe, isMapFilterVisible, hideMapFilter, showMapFilter };

/**
 * Form Values
 */
export const foremanName = writable('');
export const estimatedHoursCondition = writable(EQUALITY_ENUM.eq);
export const estimatedHours = writable<number | undefined>();
export const phaseStatus = writable('');
export const disciplineName = writable('');
export const dateRange = writable({});
