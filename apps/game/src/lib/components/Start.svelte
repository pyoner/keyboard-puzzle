<!-- Start.svelte -->
<script lang="ts">
	import { keys } from '$lib/keys';

	import Keyboard from './keyboard/Keyboard.svelte';
	import Rules from './Rules.svelte';
	import About from './About.svelte';

	type Props = {
		timeInSeconds: number;
		start: () => void;
	};
	let { timeInSeconds, start }: Props = $props();

	function startGame() {
		start();
	}
</script>

<div class="flex flex-col items-center gap-10">
	<!-- Top: Keyboard Preview -->
	<div class="w-full">
		<div class="card overflow-hidden border-2 border-base-content/10 bg-base-300 shadow-xl">
			<div class="card-body p-2 sm:p-4">
				<h2 class="card-title justify-center text-sm tracking-widest uppercase opacity-50">
					Target Layout Preview
				</h2>
				<Keyboard {keys} />
			</div>
		</div>
		<p class="mt-4 text-center text-sm italic opacity-50">
			Restore this layout within {timeInSeconds} seconds to win!
		</p>
	</div>

	<!-- Center: Action -->
	<div class="flex w-full justify-center">
		<button
			class="btn px-12 shadow-xl transition-transform btn-lg btn-primary hover:scale-105"
			onclick={startGame}
		>
			Start Game
		</button>
	</div>

	<!-- Bottom: Supporting Info -->
	<div class="flex w-full max-w-2xl flex-col gap-8">
		<Rules {timeInSeconds} />
		<About />
	</div>
</div>
