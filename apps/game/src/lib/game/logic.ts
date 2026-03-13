import { keys as originalKeys } from '$lib/keys';
import { maskLabel, isMasked, countMatchingKeys, copyKeys, shuffle } from '$lib/helpers';
import type { Key, GameState, GameResult } from './types';

export function createInitialState(): GameState {
	return {
		maskedKeys: originalKeys.map(maskLabel),
		shuffledKeys: copyKeys(shuffle(originalKeys)),
		scores: 0,
		selected: null,
		isGameOver: false
	};
}

export function getPlacedCount(maskedKeys: Key[]): number {
	return maskedKeys.filter((k) => !isMasked(k)).length;
}

export function handleShuffledButtonClick(state: GameState, key: Key): GameState {
	if (key.disabled) return state;

	return {
		...state,
		selected: key
	};
}

export function handleMaskedButtonClick(state: GameState, clickedKey: Key): GameState {
	const selected = state.selected;

	if (!isMasked(clickedKey)) {
		const originalKey = originalKeys[clickedKey.id];
		if (!originalKey) return state;

		const idToEnable = clickedKey.sourceId ?? clickedKey.id;

		const newMaskedKeys = state.maskedKeys.map((k, idx) =>
			idx === clickedKey.id ? maskLabel(originalKey) : k
		);

		const newShuffledKeys = state.shuffledKeys.map((k) =>
			k.id === idToEnable ? { ...k, disabled: false } : k
		);

		return {
			...state,
			maskedKeys: newMaskedKeys,
			shuffledKeys: newShuffledKeys
		};
	}

	if (selected && selected.type === clickedKey.type) {
		const newMaskedKeys = state.maskedKeys.map((k, idx) =>
			idx === clickedKey.id ? { ...selected, id: clickedKey.id, sourceId: selected.id } : k
		);

		const newShuffledKeys = state.shuffledKeys.map((k) =>
			k.id === selected.id ? { ...k, disabled: true } : k
		);

		return {
			...state,
			maskedKeys: newMaskedKeys,
			shuffledKeys: newShuffledKeys,
			selected: null
		};
	}

	return state;
}

export function endGame(state: GameState): GameResult {
	const scores = countMatchingKeys(originalKeys, state.maskedKeys);

	return {
		scores,
		swappedKeys: state.maskedKeys
	};
}
