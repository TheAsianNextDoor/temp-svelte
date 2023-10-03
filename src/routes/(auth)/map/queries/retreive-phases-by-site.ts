import { queryDb } from '$lib/db/query';
import type { Discipline, Phase, PhaseAssignment, Status } from '@prisma/client';

export type MapPhase = Pick<Phase, 'phase_id' | 'order' | 'estimated_hours' | 'personnel_count'> &
  Pick<Status, 'status_name'> &
  Pick<
    PhaseAssignment,
    | 'mobilization_from_location'
    | 'estimated_mobilization_duration'
    | 'scheduled_start_date_time'
    | 'scheduled_finished_date_time'
  > & { foreman_name: string } & Pick<Discipline, 'discipline_name'>;

export const retrievePhasesBySite = (siteId: string) =>
  queryDb.findMany<MapPhase>(
    `
      SELECT
        phase.phase_id,
        phase.order,
        phase.estimated_hours,
        phase.personnel_count,
        discipline.discipline_name,
        status.status_name,
        phase_assignment.mobilization_from_location,
        phase_assignment.estimated_mobilization_duration,
        phase_assignment.scheduled_start_date_time,
        phase_assignment.scheduled_finished_date_time,
        TRIM(CONCAT(person.person_first_name, ' ',  person.person_last_name)) as foreman_name
      FROM phase
      LEFT JOIN status
        ON phase.status_id = status.status_id
      LEFT JOIN discipline
        ON phase.discipline_id = discipline.discipline_id
      LEFT JOIN phase_assignment
        ON phase.phase_id = phase_assignment.phase_id
      LEFT JOIN person
        ON phase_assignment.foreman_id = person.person_id
      where phase.site_id = $1;
    `,
    [siteId],
  );
