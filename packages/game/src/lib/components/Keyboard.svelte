<!-- Keyboard.svelte -->
<script lang="ts">
	import type { Key } from '$lib/types';
	import KeyboardRow from './KeyboardRow.svelte';

	let { keys, onClick = () => {} }: { keys: Key[]; onClick?: (k: Key) => void } = $props();
</script>

<div class="keyboard">
	<KeyboardRow keys={keys.slice(0, 14)} {onClick} />
	<KeyboardRow keys={keys.slice(14, 28)} {onClick} />
	<KeyboardRow keys={keys.slice(28, 41)} {onClick} />
	<KeyboardRow keys={keys.slice(41, 53)} {onClick} />
	<KeyboardRow keys={keys.slice(53)} {onClick} />
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
