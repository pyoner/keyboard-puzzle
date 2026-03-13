<script lang="ts">
	import type { Key } from '$lib/game';
	import Start from './Start.svelte';
	import Game from './Game.svelte';
	import Result from './Result.svelte';
	import { getTimeFromQuery } from '../helpers';
	import { onMount } from 'svelte';

	let gameState = $state('start');
	let showHints = $state(true);
	let isDarkTheme = $state(false);

	function applyTheme(dark: boolean) {
		document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
	}

	onMount(() => {
		timeInSeconds = getTimeFromQuery(window.location) || timeInSeconds;

		const storedHints = localStorage.getItem('keyboard-puzzle-hints');
		if (storedHints !== null) {
			showHints = storedHints === 'true';
		}

		const storedTheme = localStorage.getItem('keyboard-puzzle-theme');
		if (storedTheme !== null) {
			isDarkTheme = storedTheme === 'dark';
		} else {
			isDarkTheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
		}
		applyTheme(isDarkTheme);
	});

	$effect(() => {
		localStorage.setItem('keyboard-puzzle-hints', showHints.toString());
	});

	$effect(() => {
		localStorage.setItem('keyboard-puzzle-theme', isDarkTheme ? 'dark' : 'light');
		applyTheme(isDarkTheme);
	});

	function handleStart() {
		gameState = 'game';
	}

	function handleEnd(event: { scores: number; swappedKeys: Key[] }) {
		gameState = 'result';
		scores = event.scores;
		swappedKeys = event.swappedKeys;
	}

	function handleReset() {
		gameState = 'start';
		scores = 0;
		swappedKeys = [];
	}

	function handlePlayAgain() {
		handleReset();
		handleStart();
	}

	let scores = $state(0);
	let swappedKeys = $state<Key[]>([]);
	let timeInSeconds = $state(3 * 60);
</script>

<div class="container mx-auto max-w-5xl px-4 py-8">
	<!-- Navigation Header -->
	<header class="navbar mb-8 rounded-box border border-base-content/5 bg-base-100 shadow-sm">
		<div class="navbar-start"></div>
		<div class="navbar-center">
			<h1 class="text-2xl font-bold tracking-tight text-primary">Keyboard Puzzle</h1>
		</div>
		<div class="navbar-end">
			<button
				class="btn btn-circle btn-ghost"
				onclick={() => (document.getElementById('settings_modal') as HTMLDialogElement).showModal()}
				aria-label="Settings"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-6 w-6"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
					/>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
					/>
				</svg>
			</button>
		</div>
	</header>

	<!-- Settings Modal -->
	<dialog id="settings_modal" class="modal">
		<div class="modal-box max-w-sm">
			<h3 class="mb-4 text-lg font-bold">Settings</h3>
			<div class="form-control">
				<label class="label cursor-pointer justify-between">
					<span class="label-text font-medium">Placement Hints</span>
					<input type="checkbox" class="toggle toggle-primary" bind:checked={showHints} />
				</label>
				<p class="mt-1 px-1 text-xs opacity-50">
					Highlights valid slots when a key is selected from the tray.
				</p>
			</div>
			<div class="form-control mt-4">
				<label class="label cursor-pointer justify-between">
					<span class="label-text font-medium">Dark Theme</span>
					<input type="checkbox" class="toggle toggle-primary" bind:checked={isDarkTheme} />
				</label>
				<p class="mt-1 px-1 text-xs opacity-50">Toggle between light and dark color schemes.</p>
			</div>
			<div class="modal-action">
				<form method="dialog">
					<button class="btn">Close</button>
				</form>
			</div>
		</div>
		<form method="dialog" class="modal-backdrop">
			<button>close</button>
		</form>
	</dialog>

	<div class="w-full">
		{#if gameState === 'start'}
			<Start {timeInSeconds} start={handleStart} />
		{:else if gameState === 'game'}
			<Game {timeInSeconds} {showHints} end={handleEnd} />
		{:else if gameState === 'result'}
			<Result score={scores} {swappedKeys} onReset={handleReset} onPlayAgain={handlePlayAgain} />
		{/if}
	</div>
</div>
