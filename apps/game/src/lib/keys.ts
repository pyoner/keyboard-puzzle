import type { Key } from './game/types';

export const keys: Key[] = [
	// Row 1
	{ id: 0, label: '`', classNames: 'key-base key-1u', type: '1u' },
	{ id: 1, label: '1', classNames: 'key-base key-1u', type: '1u' },
	{ id: 2, label: '2', classNames: 'key-base key-1u', type: '1u' },
	{ id: 3, label: '3', classNames: 'key-base key-1u', type: '1u' },
	{ id: 4, label: '4', classNames: 'key-base key-1u', type: '1u' },
	{ id: 5, label: '5', classNames: 'key-base key-1u', type: '1u' },
	{ id: 6, label: '6', classNames: 'key-base key-1u', type: '1u' },
	{ id: 7, label: '7', classNames: 'key-base key-1u', type: '1u' },
	{ id: 8, label: '8', classNames: 'key-base key-1u', type: '1u' },
	{ id: 9, label: '9', classNames: 'key-base key-1u', type: '1u' },
	{ id: 10, label: '0', classNames: 'key-base key-1u', type: '1u' },
	{ id: 11, label: '-', classNames: 'key-base key-1u', type: '1u' },
	{ id: 12, label: '=', classNames: 'key-base key-1u', type: '1u' },
	{ id: 13, label: 'Backspace', classNames: 'key-base key-pad key-2u', type: '2u' },

	// Row 2
	{ id: 14, label: 'Tab', classNames: 'key-base key-pad key-1-5u', type: '1.5u' },
	{ id: 15, label: 'Q', classNames: 'key-base key-1u', type: '1u' },
	{ id: 16, label: 'W', classNames: 'key-base key-1u', type: '1u' },
	{ id: 17, label: 'E', classNames: 'key-base key-1u', type: '1u' },
	{ id: 18, label: 'R', classNames: 'key-base key-1u', type: '1u' },
	{ id: 19, label: 'T', classNames: 'key-base key-1u', type: '1u' },
	{ id: 20, label: 'Y', classNames: 'key-base key-1u', type: '1u' },
	{ id: 21, label: 'U', classNames: 'key-base key-1u', type: '1u' },
	{ id: 22, label: 'I', classNames: 'key-base key-1u', type: '1u' },
	{ id: 23, label: 'O', classNames: 'key-base key-1u', type: '1u' },
	{ id: 24, label: 'P', classNames: 'key-base key-1u', type: '1u' },
	{ id: 25, label: '[', classNames: 'key-base key-1u', type: '1u' },
	{ id: 26, label: ']', classNames: 'key-base key-1u', type: '1u' },
	{ id: 27, label: '\\', classNames: 'key-base key-1-5u', type: '1.5u' },

	// Row 3
	{ id: 28, label: 'Caps Lock', classNames: 'key-base key-pad key-1-75u', type: '1.75u' },
	{ id: 29, label: 'A', classNames: 'key-base key-1u', type: '1u' },
	{ id: 30, label: 'S', classNames: 'key-base key-1u', type: '1u' },
	{ id: 31, label: 'D', classNames: 'key-base key-1u', type: '1u' },
	{ id: 32, label: 'F', classNames: 'key-base key-1u', type: '1u' },
	{ id: 33, label: 'G', classNames: 'key-base key-1u', type: '1u' },
	{ id: 34, label: 'H', classNames: 'key-base key-1u', type: '1u' },
	{ id: 35, label: 'J', classNames: 'key-base key-1u', type: '1u' },
	{ id: 36, label: 'K', classNames: 'key-base key-1u', type: '1u' },
	{ id: 37, label: 'L', classNames: 'key-base key-1u', type: '1u' },
	{ id: 38, label: ';', classNames: 'key-base key-1u', type: '1u' },
	{ id: 39, label: "'", classNames: 'key-base key-1u', type: '1u' },
	{ id: 40, label: 'Enter', classNames: 'key-base key-pad key-2-25u', type: '2.25u' },

	// Row 4
	{ id: 41, label: 'Shift', classNames: 'key-base key-pad key-2-25u', type: '2.25u' },
	{ id: 42, label: 'Z', classNames: 'key-base key-1u', type: '1u' },
	{ id: 43, label: 'X', classNames: 'key-base key-1u', type: '1u' },
	{ id: 44, label: 'C', classNames: 'key-base key-1u', type: '1u' },
	{ id: 45, label: 'V', classNames: 'key-base key-1u', type: '1u' },
	{ id: 46, label: 'B', classNames: 'key-base key-1u', type: '1u' },
	{ id: 47, label: 'N', classNames: 'key-base key-1u', type: '1u' },
	{ id: 48, label: 'M', classNames: 'key-base key-1u', type: '1u' },
	{ id: 49, label: ',', classNames: 'key-base key-1u', type: '1u' },
	{ id: 50, label: '.', classNames: 'key-base key-1u', type: '1u' },
	{ id: 51, label: '/', classNames: 'key-base key-1u', type: '1u' },
	{ id: 52, label: 'Shift', classNames: 'key-base key-pad key-2-75u', type: '2.75u' },

	// Row 5
	{ id: 53, label: 'Ctrl', classNames: 'key-base key-pad key-1-25u', type: '1.25u', pairId: 60 },
	{ id: 54, label: 'Win', classNames: 'key-base key-pad key-1-25u', type: '1.25u', pairId: 58 },
	{ id: 55, label: 'Alt', classNames: 'key-base key-pad key-1-25u', type: '1.25u', pairId: 57 },
	{ id: 56, label: 'Space', classNames: 'key-base key-pad key-6-25u', type: '6.25u' },
	{ id: 57, label: 'Alt', classNames: 'key-base key-pad key-1-25u', type: '1.25u', pairId: 55 },
	{ id: 58, label: 'Win', classNames: 'key-base key-pad key-1-25u', type: '1.25u', pairId: 54 },
	{ id: 59, label: 'Menu', classNames: 'key-base key-pad key-1-25u', type: '1.25u' },
	{ id: 60, label: 'Ctrl', classNames: 'key-base key-pad key-1-25u', type: '1.25u', pairId: 53 }
];
