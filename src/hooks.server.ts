import { initSupabaseServerClient, supabaseServerClient } from '$lib/supabase';

import type { GithubSession } from './app';

export const handle = async ({ event, resolve }) => {
  initSupabaseServerClient(event);
  event.locals.supabase = supabaseServerClient;

  event.locals.getSession = async () => {
    const {
      data: { session },
    } = await event.locals.supabase.auth.getSession();

    return session as GithubSession;
  };

  return resolve(event, {
    filterSerializedResponseHeaders(name) {
      return name === 'content-range';
    },
  });
};
