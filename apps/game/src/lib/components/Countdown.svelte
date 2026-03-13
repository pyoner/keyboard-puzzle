<script lang="ts">
	import { onMount } from 'svelte';

	type Props = {
		timeInSeconds?: number;
		end: () => void;
	};

	let { timeInSeconds = 0, end }: Props = $props();
	let remainingTime = $state(timeInSeconds);

	onMount(() => {
		const countdownInterval = setInterval(() => {
			if (remainingTime > 0) {
				remainingTime--;
			} else {
				clearInterval(countdownInterval);
				end();
			}
		}, 1000);

		return () => {
			clearInterval(countdownInterval);
		};
	});
</script>

<div class="flex flex-col items-center">
	<span class="countdown font-mono text-4xl">
		<span style="--value:{Math.floor(remainingTime / 60)};"></span>:
		<span style="--value:{remainingTime % 60};"></span>
	</span>
</div>
