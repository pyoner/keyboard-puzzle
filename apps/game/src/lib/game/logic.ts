import { keys as originalKeys } from '$lib/keys';
import type { Key, GameState, GameResult } from './types';

export function shuffle<T>(array: T[]): T[] {
	return array.toSorted(() => Math.random() - 0.5);
}

export function maskLabel(key: Key): Key {
	return { ...key, label: '*'.repeat(key.label.length) };
}

export function copyKeys(keys: Key[]): Key[] {
	return keys.map((key) => ({ ...key }));
}

export function isMasked(key: { label: string | string[] }): boolean {
	return key.label.includes('*');
}

export function countMatchingKeys(original: Key[], placed: Key[]): number {
	return original.reduce((count, orig, i) => {
		const key = placed[i];
		const matched =
			key?.sourceId === orig.id || (orig.pairId !== undefined && key?.sourceId === orig.pairId);
		return count + (matched ? 1 : 0);
	}, 0);
}

export function createInitialState(): GameState {
	const shuffled = shuffle(originalKeys);
	return {
		maskedKeys: originalKeys.map(maskLabel),
		shuffledKeys: shuffled.map((k) => ({ ...k })),
		scores: 0,
		selected: null,
		isGameOver: false
	};
}

export function getPlacedCount(keys: Key[]): number {
	return keys.filter((k) => !k.label.includes('*')).length;
}

export function handleShuffledButtonClick(state: GameState, key: Key): GameState {
	if (key.disabled) return state;
	return { ...state, selected: key };
}

export function handleMaskedButtonClick(state: GameState, clickedKey: Key): GameState {
	const selected = state.selected;
	const isPlaced = !clickedKey.label.includes('*');

	if (isPlaced) {
		const original = originalKeys[clickedKey.id];
		if (!original) return state;
		const idToEnable = clickedKey.sourceId ?? clickedKey.id;

		return {
			...state,
			maskedKeys: state.maskedKeys.map((k, i) => (i === clickedKey.id ? maskLabel(original) : k)),
			shuffledKeys: state.shuffledKeys.map((k) =>
				k.id === idToEnable ? { ...k, disabled: false } : k
			)
		};
	}

	if (selected && selected.type === clickedKey.type) {
		return {
			...state,
			maskedKeys: state.maskedKeys.map((k, i) =>
				i === clickedKey.id ? { ...selected, id: clickedKey.id, sourceId: selected.id } : k
			),
			shuffledKeys: state.shuffledKeys.map((k) =>
				k.id === selected.id ? { ...k, disabled: true } : k
			),
			selected: null
		};
	}

	return state;
}

export function endGame(state: GameState): GameResult {
	return {
		scores: countMatchingKeys(originalKeys, state.maskedKeys),
		swappedKeys: state.maskedKeys
	};
}
