import { custom } from 'valibot';

export const hasLower = (valueLabel: string = 'Value', count: number = 1) =>
	custom<string>(
		(value: unknown): boolean => {
			if (typeof value !== 'string') {
				return false;
			}
			const matches = value.match(/[a-z]/g);
			return matches ? matches.length >= count : false;
		},
		`${valueLabel} must contain at least ${count} lowercase letter${count > 1 ? 's' : ''}.`
	);
