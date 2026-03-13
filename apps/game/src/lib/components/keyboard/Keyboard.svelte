<!-- Keyboard.svelte -->
<script lang="ts">
	import type { Key, KeyType } from '$lib/game';
	import Row from './Row.svelte';

	type Props = {
		keys: Key[];
		selectedType?: KeyType | null;
		onClick?: (k: Key) => void;
	};
	let { keys, selectedType = null, onClick = () => {} }: Props = $props();
</script>

<div class="mx-auto flex max-w-full flex-col items-center gap-1 overflow-x-auto p-4">
	<Row keys={keys.slice(0, 14)} {onClick} {selectedType} />
	<Row keys={keys.slice(14, 28)} {onClick} {selectedType} />
	<Row keys={keys.slice(28, 41)} {onClick} {selectedType} />
	<Row keys={keys.slice(41, 53)} {onClick} {selectedType} />
	<Row keys={keys.slice(53)} {onClick} {selectedType} />
</div>
