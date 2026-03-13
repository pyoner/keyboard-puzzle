<!-- KeyboardRow.svelte -->
<script lang="ts">
	import type { Key, KeyType } from '$lib/types';
	import Button from './Button.svelte';

	type Props = {
		keys: Key[];
		selectedType?: KeyType | null;
		onClick: (key: Key) => void;
	};
	let { keys, selectedType = null, onClick }: Props = $props();
</script>

<div class="flex justify-center gap-1">
	{#each keys as key (key.id)}
		<Button {key} {onClick} highlighted={selectedType === key.type} />
	{/each}
</div>
