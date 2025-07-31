import { redirect, fail } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import * as v from 'valibot';
import { hasNumber } from '$lib/validators/hasNumber';
import { hasSpecial } from '$lib/validators/hasSpecial';
import { hasLower } from '$lib/validators/hasLower';
import { hasUpper } from '$lib/validators/hasUpper';

import { message, superValidate } from 'sveltekit-superforms/server';
import { valibot } from 'sveltekit-superforms/adapters';

const passwordSchema = v.pipe(
	v.string(),
	v.minLength(8),
	hasNumber('Password'),
	hasSpecial('Password'),
	hasLower('Password'),
	hasUpper('Password')
);
const loginSchema = v.object({
	email: v.string(),
	password: passwordSchema,
	mode: v.literal('login')
});

const registrationSchema = v.pipe(
	v.object({
		email: v.string(),
		password: passwordSchema,
		confirmPassword: v.string(),
		mode: v.literal('register')
	}),
	v.forward(
		v.partialCheck(
			[['password'], ['confirmPassword']],
			(input) => input.password === input.confirmPassword,
			'Passwords do not match'
		),
		['confirmPassword']
	)
);

const authSchema = v.union([loginSchema, registrationSchema]);

export const load: PageServerLoad = async ({ locals, url }) => {
	const { supabase } = locals;
	if (url.searchParams.has('code')) {
		await supabase.auth.exchangeCodeForSession(url.searchParams.get('code') as string);
	}

	const session = await supabase.auth.getSession();

	if (session.data.session !== null && !session.error) {
		throw redirect(302, '/app');
	} else if (session.error) {
		await supabase.auth.signOut();
		throw redirect(302, '/auth/login');
	}
	const form = await superValidate({ mode: 'login' }, valibot(authSchema));

	return {
		session: session.data.session,
		form
	};
};

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event.request, valibot(authSchema));

		if (!form.valid) return fail(400, { form });

		const { mode, password, email } = form.data;

		if (mode === 'login') {
			const { data, error } = await event.locals.supabase.auth.signInWithPassword({
				email,
				password
			});

			form.message = { status: 'error', display: error?.message ?? '' };

			if (error) return fail(400, { form });

			return message(form, { status: 'success', display: 'Login Success!' });
		} else {
			const { data, error } = await event.locals.supabase.auth.signUp({
				email,
				password,
				options: {
					emailRedirectTo: event.url.href
				}
			});
			form.message = { status: 'error', display: error?.message ?? '' };
			if (error) return fail(400, { form });
			return message(form, { status: 'success', display: 'Registration Success!' });
		}
	}
};
