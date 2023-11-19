<script lang="ts">
	import { slide } from 'svelte/transition';
	import { userService } from '../services/index.js';
	import { invalidate, invalidateAll } from '$app/navigation';

	export let data;

	let name = '';

	async function addUser() {
		if (name === '') {
			alert('Please enter a name');
			return;
		}

		const data = await userService.createUser(name);

		if (data.error) {
			alert(data.error);
		} else {
			invalidateAll();
			name = '';
		}
	}

	async function deleteUser(id: string) {
		const data = await userService.deleteUser(id);

		if (data.error) {
			alert(data.error);
		} else {
			invalidateAll();
		}
	}
</script>

<div class="flex flex-col justify-center items-center gap-8 p-8 bg-slate-200 h-screen">
	<form class="">
		<input class="border px-4 py-2 rounded" type="text" placeholder="Name" bind:value={name} />
		<button class="border px-4 py-2 bg-gray-50 rounded hover:bg-gray-100" on:click={addUser}
			>Add User</button
		>
	</form>

	{#if data.users.length}
		<h1 class="font-bold text-xl">Users</h1>
	{:else}
		<h1 class="font-bold text-xl">No users</h1>
	{/if}

	{#each data.users as user, idx}
		<div
			class="shadow-lg rounded-lg p-6 w-full bg-slate-100 hover:bg-white transition-all duration-200"
			transition:slide
		>
			<div class="flex justify-between">
				<h3 class="font-bold">{user.name}</h3>
				<button
					class="border border-red-400 rounded px-4 py-2 hover:bg-red-200 transition-all duration-200"
					on:click={() => deleteUser(user.id)}
				>
					Delete
				</button>
			</div>

			<p>Entries</p>
			{#if user.entrances === null}
				<div>No entries</div>
			{:else}
				{#each user.entrances as entry}
					<div>{entry}</div>
				{/each}
			{/if}
		</div>
	{/each}
</div>
