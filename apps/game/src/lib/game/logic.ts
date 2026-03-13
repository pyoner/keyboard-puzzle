import { keys as originalKeys } from '$lib/keys';
import type { Key, GameState, GameResult } from './types';

export function shuffle<T>(array: T[]) {
	const shuffledArray = [...array];
	for (let i = shuffledArray.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
	}
	return shuffledArray;
}

export function maskLabel(obj: Key) {
	return { ...obj, label: obj.label.replace(/./g, '*') };
}

export function isMasked(key: { label: string | string[] }) {
	return key.label.includes('*');
}

export function countMatchingKeys(a: Key[], b: Key[]) {
	let count = 0;

	for (let i = 0; i < a.length; i++) {
		const isMatched =
			b[i]?.sourceId === a[i].id || (a[i].pairId !== undefined && b[i]?.sourceId === a[i].pairId);
		if (isMatched) {
			count++;
		}
	}

	return count;
}

export function copyKeys(keys: Key[]) {
	return keys.map((key) => ({ ...key }));
}

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
