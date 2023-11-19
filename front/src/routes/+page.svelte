<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';

	export let data;

	onMount(() => {
		console.log(data);
	});
</script>

<h1>Welcome to SvelteKit</h1>
