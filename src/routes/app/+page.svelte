<script lang="ts">
	import type { PageProps } from '../$types';

	const { data }: PageProps = $props();
	const { supabase, locations } = data;
</script>

<div class="flex gap-4 text-center *:flex *:items-center *:justify-center p-16 flex-wrap">
	<div class="h-24 w-24 surface-base-lighter">Lighter</div>
	<div class="h-24 w-24 surface-base-light">Light</div>
	<div class="h-24 w-24 surface-base">Surface</div>
	<div class="h-24 w-24 surface-base-dark">Dark</div>
	<div class="h-24 w-24 surface-base-darker">Darker</div>
	<div class="h-24 w-24 surface-success">Success</div>
	<div class="h-24 w-24 surface-warning">Warning</div>
	<div class="h-24 w-24 surface-danger">Danger</div>
	<div class="h-24 w-24 surface-info">Info</div>
</div>

{#each locations as location}
	<div>{location.name}</div>
{/each}
