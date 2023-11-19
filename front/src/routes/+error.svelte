<script>
	import { page } from '$app/stores';
</script>

<div class="container">
	{#if $page.error}
		<h1>{$page.error.message}</h1>
	{/if}

	<div>We are sorry for the inconvenience</div>

	<p>Come back later</p>

	<button on:click={() => location.reload()}>Try Again</button>
</div>

<style>
	.container {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		height: 60vh;
		font-size: x-large;
	}

	h1 {
		color: darkred;
	}

	button {
		margin-top: 1rem;
		padding: 0.5rem 1rem;
		border-radius: 0.5rem;
		border: 1px solid darkred;
		background-color: transparent;
		color: darkred;
		font-size: large;
		cursor: pointer;
	}
</style>
