<!-- KeyboardButton.svlete -->
<script lang="ts">
	import type { Key } from '$lib/types';

	type Props = {
		key: Key;
		selected?: boolean;
		onClick: (k: Key) => void;
	};
	let { key, selected = false, onClick }: Props = $props();

	function handleClick() {
		if (!key.disabled) {
			onClick(key);
		}
	}
</script>

<button
	class={`btn whitespace-nowrap ${key.classNames} ${selected ? 'btn-primary' : ''}`}
	disabled={key.disabled}
	onclick={handleClick}
>
	{key.label}
</button>
