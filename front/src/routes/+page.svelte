<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import Add from '../components/add.svelte';
	import Card from '../components/card.svelte';
	import { userService } from '../services/index.js';

	export let data;

	async function deleteUser(id: string) {
		const data = await userService.deleteUser(id);

		if (data.error) {
			alert(data.error);
		} else {
			invalidateAll();
		}
	}
</script>

<div class="flex flex-col justify-center items-center gap-8 p-8 bg-slate-200 min-h-screen">
	<Add />
	{#if data.users.length}
		<h1 class="font-bold text-xl">Users</h1>
	{:else}
		<h1 class="font-bold text-xl">No users</h1>
	{/if}

	{#each data.users as user}
		<Card {user} {deleteUser} />
	{/each}
</div>
