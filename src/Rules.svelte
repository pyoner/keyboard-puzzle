<!-- Rules.svelte -->
<script>
  export let timeInSeconds;
</script>

<div class="rules">
  <h2>Welcome to the Keyboard Puzzle game!</h2>
  <p>
    The goal of this game is to restore the original order of the shuffled
    keyboard keys by swapping them with their correct positions within the time
    limit.
  </p>
  <p>Here are the game rules:</p>
  <ol class="list">
    <li>Select a key from the shuffled keys below the main keyboard.</li>
    <li>Click on a masked key in the main keyboard to swap them.</li>
    <li>
      Continue swapping keys until the main keyboard is in its correct order.
    </li>
    <li>You have {timeInSeconds} seconds to complete the puzzle.</li>
    <li>Your score is based on the number of correctly placed keys.</li>
  </ol>
  <p>Good luck and have fun!</p>
</div>

<style>
  .rules {
  }
  .list {
    text-align: left;
  }
</style>
