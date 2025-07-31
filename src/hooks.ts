import type { Transport } from '@sveltejs/kit';
import { getClient } from '$lib/supabase';

export const transport: Transport = {
	supabase: {
		encode: (v) => {
			if (typeof v !== 'object' || v === null) return false;
			if ('storageKey' in v && 'auth' in v) {
				return 'SupabasePlaceholder';
			}
			return false;
		},
		decode: (v) => {
			console.log({ v });
			if (v === 'SupabasePlaceholder') {
				return getClient();
			}
			return false;
		}
	}
};
