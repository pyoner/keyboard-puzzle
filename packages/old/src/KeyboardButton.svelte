<!-- KeyboardButton.svlete -->
<script>
  export let key = {};
  export let onClick = () => {};

  function handleClick() {
    if (!key.disabled) {
      onClick(key);
    }
  }
</script>

<style>
  .key-button {
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #ccc;
    border-radius: 4px;
    cursor: pointer;
    user-select: none;
    min-height: 30px;
    text-align: center;
    padding: 5px 10px;
    background-color: white;
    font-family: inherit;
    font-size: inherit;
    outline: none;
  }

  .key-button:focus {
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
  }

  .key-button.disabled {
    background-color: #f0f0f0;
    cursor: not-allowed;
    color: #aaa;
  }
	
	.key-matched {
    background-color: green;
    color: white;
  }

  .key-not-matched {
    background-color: red;
    color: white;
  }
</style>

<button
  class="{`${key.classNames} key-button ${key.disabled ? 'disabled' : ''}`}"
  on:click="{handleClick}"
>
  {key.label}
</button>
