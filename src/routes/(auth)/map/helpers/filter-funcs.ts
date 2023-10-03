import { STATUS_ENUM } from '$lib/constants/status';
import type { MapPhase } from '../queries/retreive-phases-by-site';
import type { MapSite } from '../queries/retrieve-map-sites';
import {
  addFilterConditionFunc,
  filterMapMarkers,
  removeFilterConditionFunc,
  type FilterType,
} from '../stores/map-marker-store';
import type { EQUALITY_ENUM } from './equality-utils';

const maybeFilterByValue = (
  filterName: string,
  shouldFilter: boolean,
  filterConditionFunc: ((phase: MapPhase) => boolean) | ((site: MapSite) => boolean),
  filterType: FilterType,
) => {
  if (shouldFilter) {
    addFilterConditionFunc(filterName, filterConditionFunc, filterType);
  } else {
    removeFilterConditionFunc(filterName);
  }

  filterMapMarkers();
};

const filterByDisciplineFunc = (phase: MapPhase, discipline: string) =>
  phase.discipline_name === discipline ?? false;

export const filterByDiscipline = (disciplineName: string) => {
  const shouldFilter = disciplineName !== '';

  maybeFilterByValue(
    'discipline',
    shouldFilter,
    (phase: MapPhase) => filterByDisciplineFunc(phase, disciplineName),
    'phase',
  );
};

const filterByStatusFunc = (phase: MapPhase, phaseStatus: string) => {
  if (phaseStatus === STATUS_ENUM.SOLD) {
    return phase.status_name !== STATUS_ENUM.COMPLETED ?? false;
  }
  return phase.status_name === phaseStatus ?? false;
};

export const filterByStatusName = (phaseStatus: string) => {
  const shouldFilter = phaseStatus !== '';

  maybeFilterByValue(
    'phaseStatus',
    shouldFilter,
    (phase: MapPhase) => filterByStatusFunc(phase, phaseStatus),
    'phase',
  );
};

const filterByEstimatedHoursFunc = (
  phase: MapPhase,
  condition: (typeof EQUALITY_ENUM)[keyof typeof EQUALITY_ENUM],
  hours: number,
) => {
  if (phase.estimated_hours === null) return false;
  if (condition === 'lt') return hours > phase.estimated_hours;
  if (condition === 'eq') return hours === phase.estimated_hours;
  if (condition === 'gt') return hours < phase.estimated_hours;

  console.error('[filterByEstimatedHoursFunc] bad condition');

  return false;
};

export const filterByEstimatedHours = (
  condition: (typeof EQUALITY_ENUM)[keyof typeof EQUALITY_ENUM],
  estimatedHours: number | undefined,
) => {
  const hours = estimatedHours ?? 0;
  const shouldFilter = hours !== 0;

  maybeFilterByValue(
    'estimatedHours',
    shouldFilter,
    (phase: MapPhase) => filterByEstimatedHoursFunc(phase, condition, hours),
    'phase',
  );
};

const filterByDateRangeFunc = (
  { scheduled_start_date_time }: MapPhase,
  { start, end }: { start?: Date; end?: Date },
) => {
  if (scheduled_start_date_time === null || !start || !end) return false;
  return scheduled_start_date_time <= end && scheduled_start_date_time >= start;
};

export const filterByDateRange = (dateRange: { start?: Date; end?: Date }) => {
  const shouldFilter = !!(dateRange?.start && dateRange.end);

  maybeFilterByValue(
    'dateRange',
    shouldFilter,
    (phase: MapPhase) => filterByDateRangeFunc(phase, dateRange),
    'phase',
  );
};

const filterByForemanFunc = (phase: MapPhase, foremanName: string) =>
  phase.foreman_name.includes(foremanName) ?? false;

export const filterByForeman = (foremanName: string) => {
  const shouldFilter = foremanName.length !== 0;

  maybeFilterByValue(
    'foreman',
    shouldFilter,
    (phase: MapPhase) => filterByForemanFunc(phase, foremanName),
    'phase',
  );
};
