export type KeyType = '1u' | '1.25u' | '1.5u' | '1.75u' | '2u' | '2.25u' | '2.75u' | '6.25u';

export type Key = {
	id: number;
	label: string;
	classNames: string;
	type: KeyType;
	disabled?: boolean;
	sourceId?: number;
	pairId?: number;
};

export type GameState = {
	maskedKeys: Key[];
	shuffledKeys: Key[];
	scores: number;
	selected: Key | null;
	isGameOver: boolean;
};

export type GameResult = {
	scores: number;
	swappedKeys: Key[];
};
