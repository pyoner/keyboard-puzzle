<!-- KeyboardRow.svelte -->
<script lang="ts">
	import type { Key } from '$lib/types';
	import Button from './Button.svelte';

	type Props = {
		keys: Key[];
		onClick: (key: Key) => void;
	};
	let { keys, onClick }: Props = $props();
</script>

<div class="flex justify-center gap-1">
	{#each keys as key (key.id)}
		<Button {key} {onClick} />
	{/each}
</div>
