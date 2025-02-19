<!-- KeyboardRow.svelte -->
<script lang="ts">
	import type { Key } from '$lib/types';
	import KeyboardButton from './KeyboardButton.svelte';

	let { keys, onButtonClick }: { keys: Key[]; onButtonClick: (label: Key['label']) => void } =
		$props();

	function handleButtonClick(buttonLabel: Key['label']) {
		onButtonClick(buttonLabel);
	}
</script>

<div class="row">
	{#each keys as key}
		<KeyboardButton {key} onClick={handleButtonClick} />
	{/each}
</div>

<style>
	.row {
		display: flex;
		justify-content: center;
		gap: 5px;
	}
</style>
