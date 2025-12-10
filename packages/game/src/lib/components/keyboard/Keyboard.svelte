<!-- Keyboard.svelte -->
<script lang="ts">
	import type { Key } from '$lib/types';
	import Row from './Row.svelte';

	type Props = {
		keys: Key[];
		onClick?: (k: Key) => void;
	};
	let { keys, onClick = () => {} }: Props = $props();
</script>

<div class="keyboard">
	<Row keys={keys.slice(0, 14)} {onClick} />
	<Row keys={keys.slice(14, 28)} {onClick} />
	<Row keys={keys.slice(28, 41)} {onClick} />
	<Row keys={keys.slice(41, 53)} {onClick} />
	<Row keys={keys.slice(53)} {onClick} />
</div>

<style>
	.keyboard {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 1rem;
		margin: 0 auto;
	}
</style>
