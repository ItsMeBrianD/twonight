import { custom } from 'valibot';

export const hasNumber = (valueLabel: string = 'Password', count: number = 1) =>
	custom<string>(
		(value: unknown): boolean => {
			if (typeof value !== 'string') {
				return false;
			}
			const matches = value.match(/\d/g);
			return matches ? matches.length >= count : false;
		},
		`${valueLabel} must contain at least ${count} number${count > 1 ? 's' : ''}.`
	);
