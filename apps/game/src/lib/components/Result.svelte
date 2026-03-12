<!-- Result.svelte -->
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

	// Create new array of keys with updated classNames
	const newKeys = keys.map((key, index) => {
		const swappedKey = swappedKeys[index];
		if (isMasked(swappedKey)) {
			return { ...key };
		}

		const isMatched = swappedKey && key.label === swappedKey.label;
		return {
			...key,
			classNames: isMatched ? `${key.classNames} key-matched` : `${key.classNames} key-not-matched`
		};
	});
</script>

<div class="result">
	<h2>Total Score: {score}</h2>
	<Keyboard keys={newKeys} />
	<div class="wrapper">
		<a href={shareOnTwitter(score)} target="_blank" rel="noopener noreferrer">Share on Twitter</a>
	</div>
</div>

<style>
	a {
		margin-top: 0.5rem;
		display: inline-block;
		padding: 0.5rem 1rem;
		border-radius: 4px;
		background-color: #1da1f2;
		color: white;
		font-weight: bold;
		text-decoration: none;
	}

	a:hover {
		background-color: #0c7fb7;
	}

	.wrapper {
		display: flex;
		justify-content: right;
	}
</style>
