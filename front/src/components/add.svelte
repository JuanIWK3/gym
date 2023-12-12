<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { userService } from '../services';

	let name: string = '';
	let pin: string = '';

	async function addUser() {
		if (name === '') {
			alert('Please enter a name');
			return;
		}

		if (pin === '') {
			alert('Please enter a pin');
			return;
		}

		const data = await userService.createUser(name, pin);

		if (data.error) {
			alert(data.error);
		} else {
			invalidateAll();
			name = '';
			pin = '';
		}
	}
</script>

<form class="">
	<input class="border px-4 py-2 rounded" type="text" placeholder="Name" bind:value={name} />
	<input class="border px-4 py-2 rounded" type="text" placeholder="Pin" bind:value={pin} />
	<button class="border px-4 py-2 bg-gray-50 rounded hover:bg-gray-100" on:click={addUser}>
		Add User
	</button>
</form>
