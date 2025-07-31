import { browser } from '$app/environment';
import { createBrowserClient, createServerClient, type CookieMethodsBrowser } from '@supabase/ssr';
import type { SupabaseClient } from '@supabase/supabase-js';
import { env } from '$env/dynamic/public';
import type { Database } from './supabase.types';

const browserCookies: CookieMethodsBrowser = {
	getAll() {
		return document.cookie
			.split(';')
			.map((cookie) => cookie.split('='))
			.reduce(
				(acc, [key, value]) => {
					acc.push({ name: key, value });
					return acc;
				},
				[] as { name: string; value: string }[]
			);
	},
	setAll(cookies) {
		cookies.forEach(({ name, value }) => {
			document.cookie =
				name +
				'=' +
				value +
				'; path=/; expires=' +
				new Date(Date.now() + 60 * 60 * 24 * 30 * 1000).toUTCString();
		});
	}
};

export const getClient = (
	cookies: CookieMethodsBrowser = browserCookies
): SupabaseClient<Database> => {
	if (browser) {
		return createBrowserClient(env.PUBLIC_SUPABASE_URL, env.PUBLIC_SUPABASE_ANON_KEY, {
			cookies
		});
	} else {
		return createServerClient(env.PUBLIC_SUPABASE_URL, env.PUBLIC_SUPABASE_ANON_KEY, {
			cookies
		});
	}
};
