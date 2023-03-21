<!-- Result.svelte -->
<script>
  import Keyboard from "./Keyboard.svelte";
  import { keys } from "./keys.js";
  import { isMasked } from "./helpers";

  export let swappedKeys = [];
  export let scores = 0;

  // Create new array of keys with updated classNames
  const newKeys = keys.map((key, index) => {
    const swappedKey = swappedKeys[index];
    if (isMasked(swappedKey)) {
      return { ...key };
    }

    const isMatched = swappedKey && key.label === swappedKey.label;
    return {
      ...key,
      classNames: isMatched
        ? `${key.classNames} key-matched`
        : `${key.classNames} key-not-matched`,
    };
  });
</script>

<div class="result">
  <div class="scores">
    <p>Total Scores: {scores}</p>
  </div>
  <Keyboard keys={newKeys} />
</div>

<style>
  .scores {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }
</style>
