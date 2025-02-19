<!-- ShuffledButtons.svelte -->
<script>
  import KeyboardButton from "./KeyboardButton.svelte";

  export let keys = [];
  export let onButtonClick = () => {};

  function handleButtonClick(key) {
    onButtonClick(key);
  }
</script>

<div class="keyboard">
  {#each keys as key}
    <div class="button-wrapper">
      <KeyboardButton {key} onClick={handleButtonClick} />
    </div>
  {/each}
</div>

<style>
  .keyboard {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    padding: 1rem;
    margin: 0 auto;
  }

  .button-wrapper {
    flex: 1 1 9%;
    display: flex;
    justify-content: center;
    padding: 0 0.5rem;
  }
</style>
