import { GITHUB_ID, GITHUB_SECRET } from '$env/static/private';
import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public';
import { createSupabaseServerClient } from '@supabase/auth-helpers-sveltekit';
import type { RequestEvent } from '@sveltejs/kit';

export let supabaseServerClient: ReturnType<typeof createSupabaseServerClient>;

console.log('backend supabase:', {
  GITHUB_ID,
  GITHUB_SECRET,
});

export const initSupabaseServerClient = (event: RequestEvent) => {
  supabaseServerClient = createSupabaseServerClient({
    supabaseUrl: PUBLIC_SUPABASE_URL,
    supabaseKey: PUBLIC_SUPABASE_ANON_KEY,
    event,
  });
};
