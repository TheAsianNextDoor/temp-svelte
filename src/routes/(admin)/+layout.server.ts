import { redirect } from '@sveltejs/kit';

import type { LayoutServerLoad } from './$types';
import { ROLE_ENUM } from '$lib/constants/role';

export const load: LayoutServerLoad = async ({ parent }) => {
  const { session, employee } = await parent();

  // fix role_id
  if ((!session || !employee) && employee?.role_name !== ROLE_ENUM.ADMIN) {
    throw redirect(303, '/login');
  }

  return {
    employee,
    session,
  };
};
