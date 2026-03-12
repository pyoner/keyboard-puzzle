<script lang="ts">
	import type { Key } from '$lib/types';
	import { maskLabel, isMasked, shuffle, countMatchingKeys, copyKeys } from '$lib/helpers';
	import { keys } from '$lib/keys';

	import Keyboard from './keyboard/Keyboard.svelte';
	import ShuffledButtons from './ShuffledButtons.svelte';
	import Countdown from './Countdown.svelte';

	type Props = {
		timeInSeconds: number;
		end: (event: { scores: number; swappedKeys: Key[] }) => void;
	};
	let { timeInSeconds, end }: Props = $props();

	let maskedKeys = $state(keys.map(maskLabel));
	let shuffledKeys = $state(copyKeys(shuffle(keys)));

	let scores = $state(0);

	let selected = $state<Key | null>(null);
	function handleShuffledButtonClick(key: Key) {
		console.log('shuffled button', key);
		selected = key;
	}

	function handleMaskedButtonClick(key: Key) {
		console.log('masked button', key);

		if (selected && isMasked(key)) {
			maskedKeys[key.id] = { ...selected };
			shuffledKeys = shuffledKeys.filter((k) => k.id !== selected!.id);
			selected = null;
		}
	}

	function handleCountdownEnd() {
		console.log('Game has ended');
		scores = countMatchingKeys(keys, maskedKeys);
		end({
			scores,
			swappedKeys: maskedKeys
		});
	}
</script>

<div>
	<Countdown {timeInSeconds} end={handleCountdownEnd}>
		<p>scores: {scores} pts</p>
	</Countdown>

	<Keyboard keys={maskedKeys} onClick={handleMaskedButtonClick} />
	<ShuffledButtons keys={shuffledKeys} onClick={handleShuffledButtonClick} {selected} />
</div>
