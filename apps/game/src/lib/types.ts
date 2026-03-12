export type KeyType = 'normal' | 'wide' | 'extra-wide';

export type Key = {
	id: number;
	label: string;
	classNames: string;
	type: KeyType;
	disabled?: boolean;
};
