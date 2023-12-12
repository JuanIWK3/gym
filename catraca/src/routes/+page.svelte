<script lang="ts">
	import { onMount } from 'svelte';

	let name = '';
	let pin = '';
	let response = '';
	let loading = false;

	async function post() {
		if (!name) {
			alert('Please enter a name');
			return;
		}

		if (!pin) {
			alert('Please enter a pin');
			return;
		}

		loading = true;

		const res = await fetch('/api', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ name, pin })
		});

		const data = await res.json();

		console.log(data);

		switch (data.message) {
			case 'denied':
				response = 'Access denied';
				break;
			case 'granted':
				response = `Access granted to ${data.name}`;
				break;
			case 'not found':
				response = 'User not found';
				break;
			case 'pin incorrect':
				response = 'Pin incorrect';
				break;
			default:
				response = 'Something went wrong';
		}

		setTimeout(() => {
			response = '';
		}, 4000);

		name = '';
		pin = '';
		loading = false;

		const nameInput = document.getElementById('name-input') as HTMLInputElement;
		nameInput.focus();
	}

	onMount(() => {
		const nameInput = document.getElementById('name-input') as HTMLInputElement;
		nameInput.focus();
	});
</script>

<div class="container">
	<form>
		<input id="name-input" type="text" placeholder="name" bind:value={name} />
		<input type="text" placeholder="pin" bind:value={pin} />
		<button on:click={post}>
			{#if loading}
				Verificando...
			{:else}
				Entrar
			{/if}
		</button>
	</form>
	<p>{response}</p>
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin-top: 20vh;
	}

	form {
		display: flex;
		justify-content: center;
		align-items: center;
		margin-bottom: 2rem;
	}

	p {
		font-size: 1.5rem;
	}

	input {
		padding: 0.8rem 1rem;
		border-radius: 0.5rem;
		border: 1px solid #000;
		font-size: 1.5rem;
		margin-right: 1rem;
	}

	button {
		padding: 1rem 2rem;
		border-radius: 0.5rem;
		background-color: #000;
		color: #fff;
		font-size: 1.5rem;
		border: none;
		cursor: pointer;
	}
</style>
