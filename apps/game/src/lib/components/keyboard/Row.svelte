<script lang="ts">
	import type { Key, KeyType } from '$lib/game';
	import Button from './Button.svelte';

	type Props = {
		keys: Key[];
		offset: number;
		selectedType?: KeyType | null;
		onClick: (index: number) => void;
	};
	let { keys, offset = 0, selectedType = null, onClick }: Props = $props();

	function handleClick(index: number) {
		onClick(offset + index);
	}
</script>

<div class="flex justify-center gap-1">
	{#each keys as key, i (i)}
		<Button {key} onClick={() => handleClick(i)} highlighted={selectedType === key.type} />
	{/each}
</div>
