<!-- KeyboardRow.svelte -->
<script lang="ts">
	import type { Key } from '$lib/types';
	import KeyboardButton from './KeyboardButton.svelte';

	let { keys, onClick }: { keys: Key[]; onClick: (key: Key) => void } = $props();
</script>

<div class="row">
	{#each keys as key}
		<KeyboardButton {key} {onClick} />
	{/each}
</div>

<style>
	.row {
		display: flex;
		justify-content: center;
		gap: 5px;
	}
</style>
