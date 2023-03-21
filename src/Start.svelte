<!-- Start.svelte -->
<script>
  import Keyboard from "./Keyboard.svelte";
  import Rules from "./Rules.svelte";
  import { keys } from "./keys.js";
  import { createEventDispatcher } from "svelte";

  export let timeInSeconds;

  const dispatch = createEventDispatcher();

  function startGame() {
    dispatch("start");
  }
</script>

<div class="start">
  <Keyboard {keys} />
  <Rules {timeInSeconds} />
  <div class="start-button-wrapper">
    <button class="start-button" on:click={startGame}>Start Game</button>
  </div>
</div>

<style>
  .start-button-wrapper {
    text-align: right;
  }
  .start-button {
    background-color: #4caf50; /* Green */
    border: none;
    color: white;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    cursor: pointer;
    border-radius: 4px;
  }
</style>
