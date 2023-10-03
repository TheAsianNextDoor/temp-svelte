import {
  type Session,
  type SupabaseClient,
  type User,
  type UserMetadata,
} from '@supabase/supabase-js';

import { type Database } from './DatabaseDefinitions';

export interface GithubSession extends Session {
  user: User & {
    user_metadata: UserMetadata & {
      avatar_url: string;
      email: string;
      email_verified: boolean;
      full_name: string;
      iss: string;
      name: string;
      preferred_username: string;
      provider_id: string;
      sub: string;
      user_name: string;
    };
  };
}

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
  namespace App {
    // interface Error {}
    interface Locals {
      supabase: SupabaseClient<Database>;
      getSession(): Promise<GithubSession | null>;
    }
    interface PageData {
      session: GithubSession | null;
    }
    // interface Platform {}
  }
}

export {};
