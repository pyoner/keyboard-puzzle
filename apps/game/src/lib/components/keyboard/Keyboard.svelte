<script lang="ts">
	import type { Key, KeyType } from '$lib/game';
	import { keys as originalKeys } from '$lib/keys';
	import Row from './Row.svelte';

	type Props = {
		keys: (Key | null)[];
		selectedType?: KeyType | null;
		onClick?: (index: number) => void;
	};
	let { keys, selectedType = null, onClick = () => {} }: Props = $props();

	function toDisplayKey(key: Key | null, index: number): Key {
		if (key === null) {
			const original = originalKeys[index];
			return {
				id: index,
				label: '*',
				classNames: original ? `${original.classNames} btn-outline` : '',
				type: original?.type || '1u'
			};
		}
		return key;
	}

	const displayKeys = $derived(keys.map(toDisplayKey));
</script>

<div class="mx-auto flex max-w-full flex-col items-center gap-1 overflow-x-auto p-4">
	<Row keys={displayKeys.slice(0, 14)} offset={0} {onClick} {selectedType} />
	<Row keys={displayKeys.slice(14, 28)} offset={14} {onClick} {selectedType} />
	<Row keys={displayKeys.slice(28, 41)} offset={28} {onClick} {selectedType} />
	<Row keys={displayKeys.slice(41, 53)} offset={41} {onClick} {selectedType} />
	<Row keys={displayKeys.slice(53)} offset={53} {onClick} {selectedType} />
</div>
