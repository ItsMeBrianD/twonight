import { custom } from 'valibot';

export const hasUpper = (valueLabel: string = 'Value', count: number = 1) =>
	custom<string>(
		(value: unknown): boolean => {
			if (typeof value !== 'string') {
				return false;
			}
			const matches = value.match(/[A-Z]/g);
			return matches ? matches.length >= count : false;
		},
		`${valueLabel} must contain at least ${count} uppercase letter${count > 1 ? 's' : ''}.`
	);
