<!-- Rules.svelte -->
<script lang="ts">
	let { timeInSeconds } = $props();
</script>

<div class="card bg-base-200 shadow-xl">
	<div class="card-body prose prose-sm max-w-none md:prose-base">
		<h2 class="card-title">Welcome to the Keyboard Puzzle game!</h2>
		<p>
			The goal of this game is to restore the original order of the shuffled keyboard keys by
			swapping them with their correct positions within the time limit.
		</p>
		<p>Here are the game rules:</p>
		<ul>
			<li>Select a key from the shuffled keys below the main keyboard.</li>
			<li>Click on a masked key in the main keyboard to swap them.</li>
			<li>Continue swapping keys until the main keyboard is in its correct order.</li>
			<li>You have {timeInSeconds} seconds to complete the puzzle.</li>
			<li>Your score is based on the number of correctly placed keys.</li>
		</ul>
		<p class="font-bold">Good luck and have fun!</p>
	</div>
</div>
