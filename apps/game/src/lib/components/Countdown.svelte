<script lang="ts">
	import { onMount } from 'svelte';

	type Props = {
		timeInSeconds?: number;
		children?: import('svelte').Snippet;
		end: () => void;
	};

	let { timeInSeconds = 0, children, end }: Props = $props();
	let remainingTime = $state(timeInSeconds);
	let showChildren = $state(false);

	onMount(() => {
		const countdownInterval = setInterval(() => {
			if (remainingTime > 0) {
				remainingTime--;
			} else {
				clearInterval(countdownInterval);
				showChildren = true;
				end();
			}
		}, 1000);

		return () => {
			clearInterval(countdownInterval);
		};
	});
</script>

{#if !showChildren}
	<div class="mb-4 flex flex-col items-center">
		<span class="countdown font-mono text-5xl">
			<span style="--value:{remainingTime};"></span>
		</span>
		<span class="text-sm font-semibold opacity-70">seconds remaining</span>
	</div>
{:else}
	{@render children?.()}
{/if}
