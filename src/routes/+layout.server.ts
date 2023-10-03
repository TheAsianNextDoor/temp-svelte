import type { LayoutServerLoad } from './$types';
import { retrieveEmployeeInfo, type EmployeeInfo } from './login/retrieve-employee-info';

export const load: LayoutServerLoad = async ({ locals: { getSession } }) => {
  const session = await getSession();

  let employee: EmployeeInfo | undefined;
  if (session?.user) {
    employee = await retrieveEmployeeInfo(session.user.user_metadata.email);
  }

  return {
    employee,
    session,
  };
};
