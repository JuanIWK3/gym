<script lang="ts">
	let name = '';

	let response = '';

	async function post() {
		if (!name) {
			alert('Please enter a name');
			return;
		}

		const res = await fetch('/api', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ name })
		});

		const data = await res.json();

		console.log(data);

		// if (data.message === 'denied') {
		// 	response = 'Access denied';
		// } else {
		// 	response = `Access granted to ${data.name}`;
		// }

		switch (data.message) {
			case 'denied':
				response = 'Access denied';
				break;
			case 'granted':
				response = `Access granted to ${data.name}`;
				break;
			default:
				response = 'Something went wrong';
		}

		setTimeout(() => {
			response = '';
		}, 2000);

		name = '';
	}
</script>

<div class="container">
	<form>
		<input type="text" placeholder="name" bind:value={name} />
		<button on:click={post}>Post</button>
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
