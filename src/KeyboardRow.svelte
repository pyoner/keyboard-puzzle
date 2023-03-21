<!-- KeyboardRow.svelte -->
<script>
  import KeyboardButton from './KeyboardButton.svelte';

  export let keys = [];
  export let onButtonClick = () => {};

  function handleButtonClick(buttonLabel) {
    onButtonClick(buttonLabel);
  }
</script>

<style>
  .row {
    display: flex;
    justify-content: center;
    gap: 5px;
  }
</style>

<div class="row">
  {#each keys as key}
    <KeyboardButton
      key="{key}"
      onClick="{handleButtonClick}"
    />
  {/each}
</div>
