<!-- Start.svelte -->
<script lang="ts">
	import { keys } from '$lib/keys';

	import Keyboard from './keyboard/Keyboard.svelte';
	import Rules from './Rules.svelte';

	type Props = {
		timeInSeconds: number;
		start: () => void;
	};
	let { timeInSeconds, start }: Props = $props();

	function startGame() {
		start();
	}
</script>

<div class="start">
	<Keyboard {keys} />
	<Rules {timeInSeconds} />
	<div class="start-button-wrapper">
		<button class="start-button" onclick={startGame}>Start Game</button>
	</div>
</div>

<style>
	.start-button-wrapper {
		text-align: right;
	}
	.start-button {
		background-color: #4caf50; /* Green */
		border: none;
		color: white;
		padding: 15px 32px;
		text-align: center;
		text-decoration: none;
		display: inline-block;
		font-size: 16px;
		margin: 4px 2px;
		cursor: pointer;
		border-radius: 4px;
	}
</style>
