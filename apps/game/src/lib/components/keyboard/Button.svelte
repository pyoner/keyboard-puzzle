<script lang="ts">
	import type { Key } from '$lib/game';

	type Props = {
		key: Key;
		selected?: boolean;
		highlighted?: boolean;
		onClick: () => void;
	};
	let { key, selected = false, highlighted = false, onClick }: Props = $props();
</script>

<button
	class={`btn whitespace-nowrap transition-all duration-200 ${key.classNames} ${selected ? 'z-10 scale-110 shadow-xl btn-primary' : ''} ${highlighted && !selected ? 'animate-pulse bg-primary/10 ring-2 ring-primary ring-offset-2 ring-offset-base-100' : ''}`}
	disabled={key.disabled}
	onclick={onClick}
>
	{key.label}
</button>
