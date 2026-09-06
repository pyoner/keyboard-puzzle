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
	const tweetUrl = 'https://keyboardpuzzle.com/';
	const encodedText = encodeURIComponent(tweetText);
	const encodedUrl = encodeURIComponent(tweetUrl);
	const shareUrl = `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`;
	return shareUrl;
}
