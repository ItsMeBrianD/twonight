import type { PageLoad } from './$types';

export const load: PageLoad = async ({ parent }) => {
	const { supabase } = await parent();

	const { data: locations } = await supabase
		.from('locations')
		.select('*')
		.order('created_at', { ascending: false });

	return {
		locations
	};
};
