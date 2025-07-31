<script lang="ts">
	let { children } = $props();
</script>

<div class="layout-app h-full w-full bg-base-darker">
    <header class="h-full w-full py-8 surface-base-dark"></header>
	<aside class="h-full w-full surface-base-lighter"></aside>
	<main>
		{@render children()}
	</main>
</div>
