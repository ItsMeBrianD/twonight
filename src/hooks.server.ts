import type { Handle } from '@sveltejs/kit';
import { getClient } from './lib/supabase';

export const handle: Handle = async ({ event, resolve }) => {
	event.locals.supabase = getClient({
		getAll() {
			return event.cookies.getAll();
		},
		setAll: (cookies) => {
			for (const cookie of cookies) {
				event.cookies.set(cookie.name, cookie.value, {
					path: '/',
					...cookie.options
				});
			}
		}
	});
	return resolve(event);
};
