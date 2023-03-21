<!-- Keyboard.svelte -->
<script>
  import KeyboardRow from "./KeyboardRow.svelte";

  export let keys = [];
  export let onButtonClick = () => {};

  function handleButtonClick(key) {
    onButtonClick(key);
  }
</script>

<div class="keyboard">
  <KeyboardRow keys={keys.slice(0, 14)} onButtonClick={handleButtonClick} />
  <KeyboardRow keys={keys.slice(14, 28)} onButtonClick={handleButtonClick} />
  <KeyboardRow keys={keys.slice(28, 41)} onButtonClick={handleButtonClick} />
  <KeyboardRow keys={keys.slice(41, 53)} onButtonClick={handleButtonClick} />
  <KeyboardRow keys={keys.slice(53)} onButtonClick={handleButtonClick} />
</div>

<style>
  .keyboard {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1rem;
    margin: 0 auto;
  }
</style>
