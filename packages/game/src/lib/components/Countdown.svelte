<script lang="ts">
	import { onMount, createEventDispatcher } from 'svelte';

	interface Props {
		timeInSeconds?: number;
		children?: import('svelte').Snippet;
	}

	let { timeInSeconds = 0, children }: Props = $props();
	let remainingTime = $state(timeInSeconds);
	let showChildren = $state(false);
	const dispatch = createEventDispatcher();

	onMount(() => {
		const countdownInterval = setInterval(() => {
			if (remainingTime > 0) {
				remainingTime--;
			} else {
				clearInterval(countdownInterval);
				showChildren = true;
				dispatch('end');
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
