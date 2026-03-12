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

<div class="flex flex-col gap-4">
	<Keyboard {keys} />
	<Rules {timeInSeconds} />
	<div class="text-right">
		<button class="btn btn-success" onclick={startGame}>Start Game</button>
	</div>
</div>
