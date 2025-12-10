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

<div class="row">
	{#each keys as key}
		<Button {key} {onClick} />
	{/each}
</div>

<style>
	.row {
		display: flex;
		justify-content: center;
		gap: 5px;
	}
</style>
