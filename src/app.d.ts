import type { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from './lib/supabase.types';
// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			supabase: SupabaseClient<Database>;
		}
		interface PageData {
			supabase: SupabaseClient<Database>;
		}
		// interface PageState {}
		// interface Platform {}

		namespace Superforms {
			interface Message {
				status: 'success' | 'error';
				display: string;
			}
		}
	}
}

export {};
