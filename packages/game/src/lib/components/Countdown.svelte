<script lang="ts">
	import { onMount } from 'svelte';

	interface Props {
		timeInSeconds?: number;
		children?: import('svelte').Snippet;
		end: () => void;
	}

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
	<p>Time remaining: {remainingTime}s</p>
{:else}
	{@render children?.()}
{/if}
