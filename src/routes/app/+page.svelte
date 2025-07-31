<script lang="ts">
	import type { PageProps } from '../$types';

	const { data }: PageProps = $props();
	const { supabase, locations } = data;
</script>

{#each locations as location}
	<div>{location.name}</div>
{/each}
