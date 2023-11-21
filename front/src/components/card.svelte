<script lang="ts">
	import { slide } from 'svelte/transition';
	export let user: {
		id: string;
		name: string;
		entrances: string[] | null;
	};
	export let deleteUser: (id: string) => void;
</script>

<div
	class="shadow-lg max-w-lg rounded-lg p-6 w-full bg-slate-100 hover:bg-white transition-all duration-200"
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

	{#if user.entrances === null}
		<div>No entries</div>
	{:else}
		{#each user.entrances as entry}
			<div>{entry.slice(0, 10)} as {entry.slice(11, 19)}</div>
		{/each}
	{/if}
</div>
