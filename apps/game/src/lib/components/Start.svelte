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

<div class="grid grid-cols-1 gap-8 lg:grid-cols-3">
	<!-- Left Column: Rules & Actions -->
	<div class="flex flex-col gap-6 lg:col-span-1">
		<Rules {timeInSeconds} />
		<button class="btn w-full shadow-lg btn-lg btn-primary" onclick={startGame}>
			Start Game
		</button>
	</div>

	<!-- Right Column: Keyboard Preview -->
	<div class="flex flex-col gap-4 lg:col-span-2">
		<div class="card overflow-hidden border-2 border-base-content/10 bg-base-300 shadow-xl">
			<div class="card-body p-2 sm:p-4">
				<h2 class="card-title justify-center text-sm tracking-widest uppercase opacity-50">
					Target Layout Preview
				</h2>
				<Keyboard {keys} />
			</div>
		</div>
		<p class="text-center text-sm italic opacity-50">
			Restore this layout within {timeInSeconds} seconds to win!
		</p>
	</div>
</div>

<About />
