<!-- ShuffledButtons.svelte -->
<script lang="ts">
	import type { Key } from '$lib/types';
	import KeyboardButton from './keyboard/Button.svelte';

	type Props = {
		keys: Key[];
		onClick: (key: Key) => void;
	};
	let { keys = [], onClick: onButtonClick = () => {} }: Props = $props();

	function handleButtonClick(key: Key) {
		onButtonClick(key);
	}
</script>

<div class="keyboard">
	{#each keys as key}
		<div class="button-wrapper">
			<KeyboardButton {key} onClick={handleButtonClick} />
		</div>
	{/each}
</div>

<style>
	.keyboard {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		flex-wrap: wrap;
		padding: 1rem;
		margin: 0 auto;
	}

	.button-wrapper {
		flex: 1 1 9%;
		display: flex;
		justify-content: center;
		padding: 0 0.5rem;
	}
</style>
