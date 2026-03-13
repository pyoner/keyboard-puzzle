import { keys as originalKeys } from '$lib/keys';
import type { Key, GameState, GameResult } from './types';

export function shuffle<T>(array: T[]): T[] {
	return array.toSorted(() => Math.random() - 0.5);
}

export function countMatchingKeys(board: (Key | null)[], original: Key[]): number {
	return original.reduce((count, orig, i) => {
		const placed = board[i];
		const matched =
			placed?.id === orig.id || (orig.pairId !== undefined && placed?.id === orig.pairId);
		return count + (matched ? 1 : 0);
	}, 0);
}

export function createInitialState(): GameState {
	const shuffled = shuffle(originalKeys);
	return {
		board: originalKeys.map(() => null),
		tray: shuffled,
		selected: null,
		scores: 0,
		isGameOver: false
	};
}

export function getPlacedCount(board: (Key | null)[]): number {
	return board.filter((k) => k !== null).length;
}

export function handleTrayButtonClick(state: GameState, key: Key): GameState {
	if (key.disabled) return state;
	return { ...state, selected: key };
}

export function handleBoardButtonClick(state: GameState, position: number): GameState {
	const selected = state.selected;
	const current = state.board[position];

	if (current !== null) {
		if (selected && selected.type === current.type) {
			const newTray = [...state.tray.filter((k) => k.id !== selected.id), current];
			const newBoard = [...state.board];
			newBoard[position] = selected;
			return {
				...state,
				board: newBoard,
				tray: newTray,
				selected: null
			};
		}
		const restoredTray = [...state.tray, current];
		const newBoard = [...state.board];
		newBoard[position] = null;
		return {
			...state,
			board: newBoard,
			tray: restoredTray,
			selected: null
		};
	}

	if (selected && selected.type === originalKeys[position].type) {
		const newTray = state.tray.filter((k) => k.id !== selected.id);
		const newBoard = [...state.board];
		newBoard[position] = selected;
		return {
			...state,
			board: newBoard,
			tray: newTray,
			selected: null
		};
	}

	return state;
}

export function endGame(state: GameState): GameResult {
	return {
		scores: countMatchingKeys(state.board, originalKeys),
		board: state.board
	};
}
