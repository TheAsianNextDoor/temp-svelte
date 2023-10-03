import { queryDb } from '$lib/db/query';
import type { Person } from '@prisma/client';

export type EmployeeInfo = Person & { role_name: string };

export const retrieveEmployeeInfo = (email: string) =>
  queryDb.findFirst<EmployeeInfo>(
    `
    SELECT 
      person.*,
      role.role_name
    FROM "person"
    LEFT JOIN "role"
      ON person.role_id = "role".role_id
    WHERE email = $1 
  `,
    [email],
  );
