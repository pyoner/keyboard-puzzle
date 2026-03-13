<!-- ShuffledButtons.svelte -->
<script lang="ts">
	import type { Key } from '$lib/game';
	import KeyboardButton from './keyboard/Button.svelte';

	type Props = {
		keys: Key[];
		selected?: Key | null;
		onClick: (key: Key) => void;
	};
	let { keys = [], selected = null, onClick: onButtonClick = () => {} }: Props = $props();

	function handleButtonClick(key: Key) {
		onButtonClick(key);
	}
</script>

<div class="mx-auto flex flex-wrap justify-center gap-1 p-4">
	{#each keys as key (key.id)}
		<KeyboardButton {key} selected={selected?.id === key.id} onClick={handleButtonClick} />
	{/each}
</div>
