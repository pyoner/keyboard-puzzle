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

<div class="mx-auto flex max-w-full flex-col items-center gap-1 overflow-x-auto p-4">
	<Row keys={keys.slice(0, 14)} {onClick} />
	<Row keys={keys.slice(14, 28)} {onClick} />
	<Row keys={keys.slice(28, 41)} {onClick} />
	<Row keys={keys.slice(41, 53)} {onClick} />
	<Row keys={keys.slice(53)} {onClick} />
</div>
