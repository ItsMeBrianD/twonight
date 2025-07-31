<script lang="ts">
	import { superForm } from 'sveltekit-superforms';
	import type { PageProps } from './$types';
	import { slide } from 'svelte/transition';

	let { data }: PageProps = $props();

	const { form, constraints, errors, enhance, message } = superForm(data.form);

	let registration = $derived($form.mode === 'register');
</script>

<div class="grid h-full grid-cols-12 grid-rows-1">
	<main
		class="col-span-6 col-start-4 flex w-full max-w-lg flex-col gap-8 self-center justify-self-center border border-black px-8 py-8"
	>
		<h1 class="text-center text-3xl font-bold">Login</h1>
		<form method="POST" class="form w-full" use:enhance>
			<input type="hidden" name="mode" bind:value={$form.mode} />
			<label>
				<span>Email</span>
				<input
					name="email"
					type="email"
					placeholder="Email"
					autocomplete="email"
					bind:value={$form.email}
					{...$constraints.email}
				/>
			</label>
			<label>
				<span>Password</span>

				<input
					name="password"
					type="password"
					placeholder="Password"
					autocomplete="current-password"
					bind:value={$form.password}
					{...$constraints.password}
				/>
				{#if $errors.password}
					<span class="error">{$errors.password}</span>
				{/if}
			</label>
			{#if $message}
				<span
					class="message"
					class:success={$message.status === 'success'}
					class:error={$message.status === 'error'}>{$message.display}</span
				>
			{/if}
			{#if $form.mode === 'register'}
				<label transition:slide>
					<span>Confirm Password</span>

					<input
						name="confirmPassword"
						type="password"
						placeholder="Confirm Password"
						autocomplete="new-password"
						bind:value={$form.confirmPassword}
						{...$constraints.confirmPassword}
					/>
					{#if $errors.confirmPassword}
						<span class="error">{$errors.confirmPassword}</span>
					{/if}
				</label>
			{/if}
			<footer>
				<button type="submit" disabled={registration}>Login</button>
				{#if registration}
					<button type="submit">Register</button>
				{:else}
					<button type="button" onclick={() => ($form.mode = 'register')}>Register</button>
				{/if}
			</footer>
		</form>
	</main>
	<aside class="col-span-8"></aside>
</div>
