<script>
  import Start from "./Start.svelte";
  import Game from "./Game.svelte";
  import Result from "./Result.svelte";
  import About from "./About.svelte";

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

  const timeInSeconds = (1 / 4) * 60;
</script>

<div class="app">
  <h1>Keyboard Puzzle</h1>
  {#if gameState === "start"}
    <Start {timeInSeconds} on:start={handleStart} />
  {:else if gameState === "game"}
    <Game {timeInSeconds} on:end={handleEnd} />
  {:else if gameState === "result"}
    <Result {scores} {swappedKeys} />
  {/if}

  <About />
</div>

<style>
  .app {
    max-width: min-content;
    margin: 1rem;
    padding: 1rem;
  }
</style>
