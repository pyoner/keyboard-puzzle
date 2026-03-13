export type KeyType = '1u' | '1.25u' | '1.5u' | '1.75u' | '2u' | '2.25u' | '2.75u' | '6.25u';

export type Key = {
	id: number;
	label: string;
	classNames: string;
	type: KeyType;
	disabled?: boolean;
	pairId?: number;
};

export type GameState = {
	board: (Key | null)[];
	tray: Key[];
	selected: Key | null;
	scores: number;
	isGameOver: boolean;
};

export type GameResult = {
	scores: number;
	board: (Key | null)[];
};
