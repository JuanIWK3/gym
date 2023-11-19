<script lang="ts">
	import { userService } from '../services/index.js';

	export let data;

	let name = '';

	async function addUser() {
		const data = await userService.createUser(name);

		if (data.error) {
			alert(data.error);
		} else {
			alert('User added');
			location.reload();
		}
	}

	async function deleteUser(id: string) {
		const data = await userService.deleteUser(id);

		if (data.error) {
			alert(data.error);
		} else {
			alert('User deleted');
			location.reload();
		}
	}
</script>

<div>
	<input type="text" placeholder="User name" bind:value={name} />
	<button on:click={addUser}>Add User</button>

	<h1>Users</h1>
	{#each data.users as user}
		<h3>{user.name}</h3>
		<button on:click={() => deleteUser(user.id)}>Delete</button>
		<p>Entries</p>
		{#if user.entrances === null}
			<div>No entries</div>
		{:else}
			{#each user.entrances as entry}
				<div>{entry}</div>
			{/each}
		{/if}
		<hr />
	{/each}
</div>
