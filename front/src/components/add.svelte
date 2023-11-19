<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { userService } from '../services';

	let name: string = '';

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
</script>

<form class="">
	<input class="border px-4 py-2 rounded" type="text" placeholder="Name" bind:value={name} />
	<button class="border px-4 py-2 bg-gray-50 rounded hover:bg-gray-100" on:click={addUser}>
		Add User
	</button>
</form>
