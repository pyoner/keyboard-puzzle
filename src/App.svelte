<script>
  import Start from "./Start.svelte";
  import Game from "./Game.svelte";
  import Result from "./Result.svelte";
  import About from "./About.svelte";
  import { getTimeFromQuery } from "./helpers";

  let gameState = "start";

  function handleStart() {
    gameState = "game";
  }

  function handleEnd(event) {
    gameState = "result";
    scores = event.detail.scores;
    swappedKeys = event.detail.swappedKeys;
  }

  let scores = 0;
  let swappedKeys = [];

  const timeInSeconds = getTimeFromQuery(window.location) || 3 * 60;
</script>

<div class="container">
  <div class="app">
    <h1>Keyboard Puzzle</h1>
    {#if gameState === "start"}
      <Start {timeInSeconds} on:start={handleStart} />
    {:else if gameState === "game"}
      <Game {timeInSeconds} on:end={handleEnd} />
    {:else if gameState === "result"}
      <Result score={scores} {swappedKeys} />
    {/if}

    <About />
  </div>
</div>

<style>
  .app {
    max-width: min-content;
    margin: 1rem;
    padding: 1rem;
  }
  .container {
    display: flex;
    justify-content: center;
  }
</style>
