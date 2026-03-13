<script lang="ts">
	import type { Key } from '$lib/types';
	import { maskLabel, isMasked, shuffle, countMatchingKeys, copyKeys } from '$lib/helpers';
	import { keys } from '$lib/keys';

	import Keyboard from './keyboard/Keyboard.svelte';
	import ShuffledButtons from './ShuffledButtons.svelte';
	import Countdown from './Countdown.svelte';

	type Props = {
		timeInSeconds: number;
		showHints: boolean;
		end: (event: { scores: number; swappedKeys: Key[] }) => void;
	};
	let { timeInSeconds, showHints, end }: Props = $props();

	let maskedKeys = $state(keys.map(maskLabel));
	let shuffledKeys = $state(copyKeys(shuffle(keys)));

	let scores = $state(0);
	let placedCount = $derived(maskedKeys.filter((k) => !isMasked(k)).length);

	let selected = $state<Key | null>(null);
	function handleShuffledButtonClick(key: Key) {
		if (key.disabled) return;
		selected = key;
	}

	function handleMaskedButtonClick(key: Key) {
		// If clicking a filled slot, return it to the tray (Undo)
		if (!isMasked(key)) {
			const originalKey = keys[key.id];
			if (!originalKey) return;

			// Mark the key as enabled in the tray using the sourceId (if available)
			const idToEnable = key.sourceId ?? key.id;
			shuffledKeys = shuffledKeys.map((k) => (k.id === idToEnable ? { ...k, disabled: false } : k));

			// Re-mask the slot
			maskedKeys[key.id] = maskLabel(originalKey);
			return;
		}

		// If a key is selected and matches the slot type, place it
		if (selected && selected.type === key.type) {
			// Preserve the original key.id to prevent Svelte from breaking keyed each loops
			// but store the selected key's original ID as sourceId for undo functionality
			maskedKeys[key.id] = { ...selected, id: key.id, sourceId: selected.id };
			shuffledKeys = shuffledKeys.map((k) =>
				k.id === selected!.id ? { ...k, disabled: true } : k
			);
			selected = null;
		}
	}

	function handleCountdownEnd() {
		scores = countMatchingKeys(keys, maskedKeys);
		end({
			scores,
			swappedKeys: maskedKeys
		});
	}
</script>

<div class="flex flex-col gap-8">
	<!-- Stats Dashboard -->
	<div class="stats w-full bg-base-200 shadow-lg">
		<div class="stat place-items-center">
			<div class="stat-title">Time Left</div>
			<div class="stat-value text-primary">
				<Countdown {timeInSeconds} end={handleCountdownEnd} />
			</div>
		</div>

		<div class="stat place-items-center">
			<div class="stat-title">Progress</div>
			<div class="stat-value">{placedCount} / {keys.length}</div>
			<div class="stat-desc">Keys Snap-fitted</div>
		</div>

		<div class="stat place-items-center">
			<div class="stat-title">Current Match</div>
			<div class="stat-value text-secondary">
				{selected ? selected.label : '--'}
			</div>
			<div class="stat-desc">Selected Key</div>
		</div>
	</div>

	<!-- Main Keyboard Workmat -->
	<div class="card overflow-hidden border-2 border-base-content/10 bg-base-300 shadow-xl">
		<div class="card-body p-2 sm:p-4">
			<h2 class="mb-2 card-title justify-center text-sm tracking-widest uppercase opacity-50">
				Keyboard Plate
			</h2>
			<Keyboard
				keys={maskedKeys}
				onClick={handleMaskedButtonClick}
				selectedType={showHints ? selected?.type : null}
			/>
		</div>
	</div>

	<!-- Key Tray -->
	<div class="card border-2 border-dashed border-base-content/20 bg-base-200 shadow-inner">
		<div class="card-body p-4">
			<div class="mb-2 flex items-center justify-between">
				<h2 class="card-title text-sm tracking-widest uppercase opacity-50">Your Key Tray</h2>
				{#if selected}
					<button class="btn text-error btn-ghost btn-xs" onclick={() => (selected = null)}>
						Deselect
					</button>
				{/if}
			</div>
			<div class="max-h-64 overflow-y-auto">
				<ShuffledButtons keys={shuffledKeys} onClick={handleShuffledButtonClick} {selected} />
			</div>
		</div>
	</div>
</div>
