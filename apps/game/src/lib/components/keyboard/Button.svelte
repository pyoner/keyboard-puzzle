<!-- KeyboardButton.svlete -->
<script lang="ts">
	import type { Key } from '$lib/types';

	type Props = {
		key: Key;
		onClick: (k: Key) => void;
	};
	let { key, onClick }: Props = $props();

	function handleClick() {
		if (!key.disabled) {
			onClick(key);
		}
	}
</script>

<button
	class={`btn btn-lg ${key.classNames} ${key.disabled ? 'btn-disabled' : ''}`}
	onclick={handleClick}
>
	{key.label}
</button>
