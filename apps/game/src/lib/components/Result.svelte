<script lang="ts">
	import type { Key } from '$lib/game';
	import { keys } from '$lib/keys';
	import { isMasked } from '$lib/game';
	import { shareOnTwitter } from '$lib/helpers';

	import Keyboard from './keyboard/Keyboard.svelte';

	interface Props {
		swappedKeys?: Key[];
		score?: number;
		onReset: () => void;
		onPlayAgain: () => void;
	}

	let { swappedKeys = [], score = 0, onReset, onPlayAgain }: Props = $props();

	const newKeys = $derived(
		keys.map((key, index) => {
			const swappedKey = swappedKeys[index];
			if (isMasked(swappedKey)) {
				return { ...key };
			}

			const isMatched =
				swappedKey &&
				(swappedKey.sourceId === key.id ||
					(key.pairId !== undefined && swappedKey.sourceId === key.pairId));
			return {
				...key,
				classNames: isMatched
					? `${key.classNames} bg-success text-success-content`
					: `${key.classNames} bg-error text-error-content`
			};
		})
	);
</script>

<div class="flex flex-col gap-6 pt-4">
	<div class="text-center">
		<h2 class="mb-2 text-4xl font-extrabold text-primary">Game Over</h2>
		<p class="text-2xl font-semibold">Total Score: {score}</p>
	</div>
	<Keyboard keys={newKeys} />
	<div class="mt-4 flex justify-center gap-4">
		<button class="btn btn-lg btn-primary" onclick={onPlayAgain}>Play Again</button>
		<button class="btn btn-outline btn-lg" onclick={onReset}>Main Menu</button>
		<!-- eslint-disable svelte/no-navigation-without-resolve -->
		<a
			href={shareOnTwitter(score)}
			class="btn btn-lg btn-info"
			target="_blank"
			rel="noopener noreferrer">Share on Twitter</a
		>
		<!-- eslint-enable svelte/no-navigation-without-resolve -->
	</div>
</div>
