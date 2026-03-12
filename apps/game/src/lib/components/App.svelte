<script lang="ts">
	import type { Key } from '$lib/types';
	import Start from './Start.svelte';
	import Game from './Game.svelte';
	import Result from './Result.svelte';
	import About from './About.svelte';
	import { getTimeFromQuery } from '../helpers';
	import { onMount } from 'svelte';

	let gameState = $state('start');

	function handleStart() {
		gameState = 'game';
	}

	function handleEnd(event: { scores: number; swappedKeys: Key[] }) {
		gameState = 'result';
		scores = event.scores;
		swappedKeys = event.swappedKeys;
	}

	let scores = $state(0);
	let swappedKeys = $state<Key[]>([]);
	let timeInSeconds = $state(3 * 60);
	onMount(() => {
		timeInSeconds = getTimeFromQuery(window.location) || timeInSeconds;
	});
</script>

<div class="container mx-auto max-w-5xl px-4 py-8">
	<div class="w-full">
		<h1 class="mb-8 text-center text-4xl font-bold text-primary">Keyboard Puzzle</h1>
		{#if gameState === 'start'}
			<Start {timeInSeconds} start={handleStart} />
		{:else if gameState === 'game'}
			<Game {timeInSeconds} end={handleEnd} />
		{:else if gameState === 'result'}
			<Result score={scores} {swappedKeys} />
		{/if}

		<About />
	</div>
</div>
