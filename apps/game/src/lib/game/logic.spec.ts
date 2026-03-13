import { describe, it, expect, beforeEach } from 'vitest';
import {
	shuffle,
	maskLabel,
	isMasked,
	countMatchingKeys,
	copyKeys,
	createInitialState,
	getPlacedCount,
	handleShuffledButtonClick,
	handleMaskedButtonClick,
	endGame
} from '$lib/game/logic';
import { keys as originalKeys } from '$lib/keys';
import type { GameState } from '$lib/game/types';

describe('shuffle', () => {
	it('returns array with same length', () => {
		const arr = [1, 2, 3, 4, 5];
		const result = shuffle(arr);
		expect(result).toHaveLength(arr.length);
	});

	it('contains all original elements', () => {
		const arr = [1, 2, 3, 4, 5];
		const result = shuffle(arr);
		expect(result.sort()).toEqual(arr);
	});

	it('does not mutate original array', () => {
		const arr = [1, 2, 3, 4, 5];
		const original = [...arr];
		shuffle(arr);
		expect(arr).toEqual(original);
	});
});

describe('maskLabel', () => {
	it('replaces all characters with asterisk', () => {
		const key = { id: 1, label: 'A', classNames: 'key', type: '1u' as const };
		const result = maskLabel(key);
		expect(result.label).toBe('*');
	});

	it('preserves multi-character labels', () => {
		const key = { id: 1, label: 'ABC', classNames: 'key', type: '1u' as const };
		const result = maskLabel(key);
		expect(result.label).toBe('***');
	});

	it('preserves other properties', () => {
		const key = { id: 1, label: 'A', classNames: 'key', type: '1u' as const };
		const result = maskLabel(key);
		expect(result.id).toBe(1);
		expect(result.classNames).toBe('key');
		expect(result.type).toBe('1u');
	});
});

describe('isMasked', () => {
	it('returns true for masked label', () => {
		const key = { label: '***' };
		expect(isMasked(key)).toBe(true);
	});

	it('returns false for normal label', () => {
		const key = { label: 'A' };
		expect(isMasked(key)).toBe(false);
	});
});

describe('countMatchingKeys', () => {
	it('counts matched keys by id', () => {
		const original = [
			{ id: 0, label: 'A', classNames: '', type: '1u' as const, sourceId: 0 },
			{ id: 1, label: 'B', classNames: '', type: '1u' as const }
		];
		const placed = [
			{ id: 0, label: 'A', classNames: '', type: '1u' as const, sourceId: 0 },
			{ id: 1, label: 'B', classNames: '', type: '1u' as const, sourceId: 99 }
		];
		expect(countMatchingKeys(original, placed)).toBe(1);
	});

	it('counts matched keys by pairId', () => {
		const original = [
			{ id: 0, label: 'Ctrl', classNames: '', type: '1.25u' as const, pairId: 5 },
			{ id: 1, label: 'A', classNames: '', type: '1u' as const }
		];
		const placed = [
			{ id: 0, label: 'Ctrl', classNames: '', type: '1.25u' as const, sourceId: 5 },
			{ id: 1, label: 'A', classNames: '', type: '1u' as const, sourceId: 99 }
		];
		expect(countMatchingKeys(original, placed)).toBe(1);
	});

	it('returns 0 when no matches', () => {
		const original = [{ id: 0, label: 'A', classNames: '', type: '1u' as const }];
		const placed = [{ id: 0, label: 'X', classNames: '', type: '1u' as const, sourceId: 99 }];
		expect(countMatchingKeys(original, placed)).toBe(0);
	});
});

describe('copyKeys', () => {
	it('creates independent copy', () => {
		const keys = [{ id: 1, label: 'A', classNames: 'key', type: '1u' as const }];
		const copy = copyKeys(keys);
		copy[0].label = 'X';
		expect(keys[0].label).toBe('A');
	});

	it('preserves all properties', () => {
		const keys = [{ id: 1, label: 'A', classNames: 'key', type: '1u' as const, disabled: true }];
		const copy = copyKeys(keys);
		expect(copy[0]).toEqual(keys[0]);
	});
});

describe('createInitialState', () => {
	it('creates state with correct structure', () => {
		const state = createInitialState();
		expect(state).toHaveProperty('maskedKeys');
		expect(state).toHaveProperty('shuffledKeys');
		expect(state).toHaveProperty('scores', 0);
		expect(state).toHaveProperty('selected', null);
		expect(state).toHaveProperty('isGameOver', false);
	});

	it('masks all key labels', () => {
		const state = createInitialState();
		state.maskedKeys.forEach((key) => {
			expect(isMasked(key)).toBe(true);
		});
	});

	it('has same number of shuffled keys as original', () => {
		const state = createInitialState();
		expect(state.shuffledKeys).toHaveLength(originalKeys.length);
	});
});

describe('getPlacedCount', () => {
	it('returns 0 for all masked keys', () => {
		const maskedKeys = originalKeys.map(maskLabel);
		expect(getPlacedCount(maskedKeys)).toBe(0);
	});

	it('counts placed keys correctly', () => {
		const maskedKeys = originalKeys.map(maskLabel);
		maskedKeys[0] = { ...originalKeys[0], sourceId: 0 };
		maskedKeys[1] = { ...originalKeys[1], sourceId: 1 };
		expect(getPlacedCount(maskedKeys)).toBe(2);
	});
});

describe('handleShuffledButtonClick', () => {
	it('selects key when not disabled', () => {
		const key = { id: 0, label: 'A', classNames: '', type: '1u' as const };
		const state: GameState = {
			maskedKeys: [],
			shuffledKeys: [],
			scores: 0,
			selected: null,
			isGameOver: false
		};
		const result = handleShuffledButtonClick(state, key);
		expect(result.selected).toEqual(key);
	});

	it('returns same state when key is disabled', () => {
		const key = { id: 0, label: 'A', classNames: '', type: '1u' as const, disabled: true };
		const state: GameState = {
			maskedKeys: [],
			shuffledKeys: [],
			scores: 0,
			selected: null,
			isGameOver: false
		};
		const result = handleShuffledButtonClick(state, key);
		expect(result.selected).toBeNull();
	});
});

describe('handleMaskedButtonClick', () => {
	let state: GameState;

	beforeEach(() => {
		state = createInitialState();
	});

	it('places key when type matches selected', () => {
		const shuffledKey = state.shuffledKeys[0];
		state = { ...state, selected: shuffledKey };

		const clickedKey = state.maskedKeys[shuffledKey.id];
		const result = handleMaskedButtonClick(state, clickedKey);

		expect(result.maskedKeys[shuffledKey.id].sourceId).toBe(shuffledKey.id);
		expect(result.selected).toBeNull();
		expect(result.shuffledKeys.find((k) => k.id === shuffledKey.id)?.disabled).toBe(true);
	});

	it('returns key to tray when clicking filled slot (undo)', () => {
		const shuffledKey = state.shuffledKeys[0];
		state = { ...state, selected: shuffledKey };

		const clickedKey = state.maskedKeys[shuffledKey.id];
		state = handleMaskedButtonClick(state, clickedKey);

		const result = handleMaskedButtonClick(state, state.maskedKeys[shuffledKey.id]);

		expect(isMasked(result.maskedKeys[shuffledKey.id])).toBe(true);
		expect(result.shuffledKeys.find((k) => k.id === shuffledKey.id)?.disabled).toBe(false);
	});

	it('does nothing when type does not match', () => {
		const shuffledKey = state.shuffledKeys.find((k) => k.type === '1u')!;
		const wrongTypeKey = state.maskedKeys.find((k) => k.type !== '1u' && isMasked(k))!;

		state = { ...state, selected: shuffledKey };
		const result = handleMaskedButtonClick(state, wrongTypeKey);

		expect(result).toEqual(state);
	});
});

describe('endGame', () => {
	it('returns scores and swappedKeys', () => {
		const state = createInitialState();
		state.maskedKeys[0] = { ...originalKeys[0], sourceId: 0 };

		const result = endGame(state);

		expect(result.scores).toBe(1);
		expect(result.swappedKeys).toBe(state.maskedKeys);
	});
});
