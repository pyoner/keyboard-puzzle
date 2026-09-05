import { describe, it, expect, beforeEach } from 'vite-plus/test';
import {
	shuffle,
	countMatchingKeys,
	createInitialState,
	getPlacedCount,
	handleTrayButtonClick,
	handleBoardButtonClick,
	endGame
} from '$lib/game/logic';
import { keys as originalKeys } from '$lib/keys';
import type { GameState, Key } from '$lib/game/types';

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

describe('countMatchingKeys', () => {
	it('counts matched keys by id', () => {
		const original = [
			{ id: 0, label: 'A', classNames: '', type: '1u' as const },
			{ id: 1, label: 'B', classNames: '', type: '1u' as const }
		];
		const board: (Key | null)[] = [
			{ id: 0, label: 'A', classNames: '', type: '1u' as const },
			null
		];
		expect(countMatchingKeys(board, original)).toBe(1);
	});

	it('counts matched keys by pairId', () => {
		const original = [
			{ id: 0, label: 'Ctrl', classNames: '', type: '1.25u' as const, pairId: 5 },
			{ id: 1, label: 'A', classNames: '', type: '1u' as const }
		];
		const board: (Key | null)[] = [
			{ id: 5, label: 'Ctrl', classNames: '', type: '1.25u' as const },
			null
		];
		expect(countMatchingKeys(board, original)).toBe(1);
	});

	it('returns 0 when no matches', () => {
		const original = [{ id: 0, label: 'A', classNames: '', type: '1u' as const }];
		const board: (Key | null)[] = [{ id: 99, label: 'X', classNames: '', type: '1u' as const }];
		expect(countMatchingKeys(board, original)).toBe(0);
	});
});

describe('createInitialState', () => {
	it('creates state with correct structure', () => {
		const state = createInitialState();
		expect(state).toHaveProperty('board');
		expect(state).toHaveProperty('tray');
		expect(state).toHaveProperty('scores', 0);
		expect(state).toHaveProperty('selected', null);
		expect(state).toHaveProperty('isGameOver', false);
	});

	it('board has nulls for all positions', () => {
		const state = createInitialState();
		expect(state.board.every((k) => k === null)).toBe(true);
	});

	it('tray has same number of keys as original', () => {
		const state = createInitialState();
		expect(state.tray).toHaveLength(originalKeys.length);
	});
});

describe('getPlacedCount', () => {
	it('returns 0 for empty board', () => {
		const board = originalKeys.map(() => null);
		expect(getPlacedCount(board)).toBe(0);
	});

	it('counts placed keys correctly', () => {
		const board: (Key | null)[] = originalKeys.map(() => null);
		board[0] = { id: 0, label: 'A', classNames: '', type: '1u' as const };
		board[1] = { id: 1, label: 'B', classNames: '', type: '1u' as const };
		expect(getPlacedCount(board)).toBe(2);
	});
});

describe('handleTrayButtonClick', () => {
	it('selects key when not disabled', () => {
		const key = { id: 0, label: 'A', classNames: '', type: '1u' as const };
		const state: GameState = {
			board: [],
			tray: [],
			scores: 0,
			selected: null,
			isGameOver: false
		};
		const result = handleTrayButtonClick(state, key);
		expect(result.selected).toEqual(key);
	});

	it('returns same state when key is disabled', () => {
		const key = { id: 0, label: 'A', classNames: '', type: '1u' as const, disabled: true };
		const state: GameState = {
			board: [],
			tray: [],
			scores: 0,
			selected: null,
			isGameOver: false
		};
		const result = handleTrayButtonClick(state, key);
		expect(result.selected).toBeNull();
	});
});

describe('handleBoardButtonClick', () => {
	let state: GameState;

	beforeEach(() => {
		state = createInitialState();
	});

	it('places key when type matches and position is empty', () => {
		const key1u = state.tray.find((k) => k.type === '1u')!;
		const pos1u = originalKeys.findIndex((k) => k.type === '1u');
		state = { ...state, selected: key1u };

		const result = handleBoardButtonClick(state, pos1u);

		expect(result.board[pos1u]?.id).toBe(key1u.id);
		expect(result.tray.find((k) => k.id === key1u.id)).toBeUndefined();
		expect(result.selected).toBeNull();
	});

	it('correctly matches keys 9 and 0 in their positions', () => {
		const key9 = state.tray.find((k) => k.label === '9')!;
		const key0 = state.tray.find((k) => k.label === '0')!;

		state = { ...state, selected: key9 };
		let result = handleBoardButtonClick(state, 9);
		expect(result.board[9]?.id).toBe(9);

		state = { ...result, selected: key0 };
		result = handleBoardButtonClick(state, 10);
		expect(result.board[10]?.id).toBe(10);

		const gameResult = endGame(result);
		expect(gameResult.scores).toBeGreaterThanOrEqual(2);
	});

	it('correctly highlights wrong placement (9 in slot 10)', () => {
		const key9 = state.tray.find((k) => k.label === '9')!;

		state = { ...state, selected: key9 };
		const result = handleBoardButtonClick(state, 10);

		expect(result.board[10]?.id).toBe(9);

		const gameResult = endGame(result);
		expect(gameResult.scores).toBe(0);
	});

	it('removes key from board when clicking filled slot (undo)', () => {
		const trayKey = state.tray[0];
		state = { ...state, selected: trayKey };
		state = handleBoardButtonClick(state, 0);

		const result = handleBoardButtonClick(state, 0);

		expect(result.board[0]).toBeNull();
		expect(result.tray.find((k) => k.id === trayKey.id)).toBeDefined();
	});

	it('swaps key when clicking filled slot with same type selected', () => {
		const keyA = state.tray.find((k) => k.label === 'A')!;
		const keyB = state.tray.find((k) => k.label === 'B')!;
		const posA = originalKeys.findIndex((k) => k.label === 'A');

		state = { ...state, selected: keyA };
		state = handleBoardButtonClick(state, posA);
		expect(state.board[posA]?.label).toBe('A');

		state = { ...state, selected: keyB };
		const result = handleBoardButtonClick(state, posA);

		expect(result.board[posA]?.label).toBe('B');
		expect(result.tray.find((k) => k.label === 'A')).toBeDefined();
		expect(result.tray.find((k) => k.label === 'B')).toBeUndefined();
	});

	it('does nothing when type does not match', () => {
		const key1u = state.tray.find((k) => k.type === '1u')!;
		const wrongTypePosition = originalKeys.findIndex((k) => k.type !== '1u');

		state = { ...state, selected: key1u };
		const result = handleBoardButtonClick(state, wrongTypePosition);

		expect(result.board[wrongTypePosition]).toBeNull();
		expect(result.selected).toEqual(key1u);
	});
});

describe('endGame', () => {
	it('returns scores and board', () => {
		const state = createInitialState();
		state.board[0] = { id: 0, label: 'A', classNames: '', type: '1u' as const };

		const result = endGame(state);

		expect(result.scores).toBe(1);
		expect(result.board).toBe(state.board);
	});
});
