<script lang="ts">
	import type { Key } from '$lib/types';
	import { keys } from '$lib/keys';
	import { isMasked, shareOnTwitter } from '$lib/helpers';

	import Keyboard from './keyboard/Keyboard.svelte';

	interface Props {
		swappedKeys?: Key[];
		score?: number;
	}

	let { swappedKeys = [], score = 0 }: Props = $props();

	const newKeys = keys.map((key, index) => {
		const swappedKey = swappedKeys[index];
		if (isMasked(swappedKey)) {
			return { ...key };
		}

		const isMatched = swappedKey && key.label === swappedKey.label;
		return {
			...key,
			classNames: isMatched
				? `${key.classNames} bg-success text-success-content`
				: `${key.classNames} bg-error text-error-content`
		};
	});
</script>

<div class="flex flex-col gap-4">
	<h2 class="text-2xl font-bold">Total Score: {score}</h2>
	<Keyboard keys={newKeys} />
	<div class="flex justify-end">
		<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
		<a href={shareOnTwitter(score)} class="btn btn-info" target="_blank" rel="noopener noreferrer"
			>Share on Twitter</a
		>
	</div>
</div>
