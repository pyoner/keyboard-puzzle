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
		timeInSeconds = getTimeFromQuery(window.location) || 3 * 60;
	});
</script>

<div class="container">
	<div class="app">
		<h1>Keyboard Puzzle</h1>
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

<style>
	.app {
		max-width: min-content;
		margin: 1rem;
		padding: 1rem;
	}
	.container {
		display: flex;
		justify-content: center;
	}
</style>
