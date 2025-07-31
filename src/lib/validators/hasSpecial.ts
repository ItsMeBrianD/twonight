import { custom } from 'valibot';

export const specialCharacters = [
	'!',
	'@',
	'#',
	'$',
	'%',
	'^',
	'&',
	'*',
	'(',
	')',
	'_',
	'+',
	'-',
	'=',
	'{',
	'}',
	'[',
	']',
	'|',
	':',
	';',
	"'",
	'"',
	'<',
	'>',
	',',
	'.',
	'?',
	'/'
];
export const hasSpecial = (
	valueLabel: string = 'Password',
	count: number = 1,
	allowedCharacters: string[] = specialCharacters
) =>
	custom<string>(
		(value: unknown): boolean => {
			if (typeof value !== 'string') {
				return false;
			}
			const matches = value.match(new RegExp(`[${allowedCharacters.join('')}]`, 'g'));
			return matches ? matches.length >= count : false;
		},
		`${valueLabel} must contain at least ${count} special character${count > 1 ? 's' : ''}.`
	);
