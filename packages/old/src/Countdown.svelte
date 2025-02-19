<script>
  import { onMount, createEventDispatcher } from 'svelte';

  export let timeInSeconds = 0;
  let remainingTime = timeInSeconds;
  let showChildren = false;
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
  <slot></slot>
{/if}
