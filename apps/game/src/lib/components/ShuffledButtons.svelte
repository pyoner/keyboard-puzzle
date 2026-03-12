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

<div class="mx-auto flex flex-wrap justify-center gap-1 p-4">
	{#each keys as key (key.id)}
		<KeyboardButton {key} onClick={handleButtonClick} />
	{/each}
</div>
