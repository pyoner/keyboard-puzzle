<script>
  import Start from './Start.svelte';
  import Game from './Game.svelte';
  import Result from './Result.svelte';
	import About from './About.svelte'

  let gameState = 'start';

  function handleStart() {
    gameState = 'game';
  }

  function handleEnd(event) {
    gameState = 'result';
    scores = event.detail.scores;
    swappedKeys = event.detail.swappedKeys;
  }

  let scores = 0;
  let swappedKeys = [];

  const timeInSeconds = 3 * 60;
</script>

{#if gameState === 'start'}
  <Start timeInSeconds={timeInSeconds} on:start="{handleStart}" />
{:else if gameState === 'game'}
  <Game timeInSeconds="{timeInSeconds}" on:end="{handleEnd}" />
{:else if gameState === 'result'}
  <Result scores="{scores}" swappedKeys="{swappedKeys}" />
{/if}

<About></About>
