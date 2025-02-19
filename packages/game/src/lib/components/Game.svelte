<script lang="ts">
	import { run } from 'svelte/legacy';

	import { createEventDispatcher } from 'svelte';

	import Keyboard from './Keyboard.svelte';
	import ShuffledButtons from './ShuffledButtons.svelte';
	import Countdown from './Countdown.svelte';
	import { keys } from '$lib/keys';
	import { maskLabel, isMasked, shuffle, countMatchingKeys, copyKeys } from '$lib/helpers';

	let { timeInSeconds } = $props();

	const dispatch = createEventDispatcher();

	let maskedKeys = $state(keys.map(maskLabel));
	let shuffledKeys = $state(copyKeys(shuffle(keys)));

	let scores = $state(0);
	let gameEnded = false;
	run(() => {
		scores = countMatchingKeys(keys, maskedKeys);
	});

	let selected = null;
	function handleShuffledButtonClick(key) {
		console.log('shuffled button', key);
		selected = key;
	}

	function handleMaskedButtonClick(key) {
		console.log('masked button', key);

		if (selected && isMasked(key)) {
			maskedKeys[key.id] = { ...selected };
			selected.disabled = true;
			selected = null;
			shuffledKeys = [...shuffledKeys];
		}
	}

	function handleCountdownEnd() {
		gameEnded = true;
		console.log('Game has ended');
		dispatch('end', {
			scores,
			swappedKeys: maskedKeys
		});
	}
</script>

<div>
	<Countdown {timeInSeconds} on:end={handleCountdownEnd}>
		<p>scores: {scores} pts</p>
	</Countdown>

	<Keyboard keys={maskedKeys} onButtonClick={handleMaskedButtonClick} />
	<ShuffledButtons keys={shuffledKeys} onButtonClick={handleShuffledButtonClick} />
</div>
