import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ parent }) => {
	const { supabase } = await parent();
	return {
		supabase
	};
};
