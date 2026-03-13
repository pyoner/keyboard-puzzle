import type { Key } from './types';

// helpers.js
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
		// Compare the sourceId of the placed key with the original slot id or its pairId
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

export function getTimeFromQuery(url: Location) {
	const urlParams = new URLSearchParams(url.search);
	const timeStr = urlParams.get('time');
	let time;
	try {
		time = parseInt(timeStr || '', 10);
	} catch {
		time = 0;
	}
	return time;
}

export function shareOnTwitter(score: unknown) {
	const tweetText = `I scored ${score} points in the Keyboard Puzzle Game, built with ChatGPT by @pyoner! Can you beat my score? 🤔🎮 #keyboardpuzzlegame #chatgpt #ai #games`;
	const tweetUrl = `https://keyboard-puzzle.vercel.app/`;
	const encodedText = encodeURIComponent(tweetText);
	const encodedUrl = encodeURIComponent(tweetUrl);
	const shareUrl = `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`;
	return shareUrl;
}
