<script lang="ts">
	import type { Key } from '$lib/game';
	import { keys } from '$lib/keys';
	import {
		createInitialState,
		getPlacedCount,
		handleTrayButtonClick,
		handleBoardButtonClick,
		endGame
	} from '$lib/game';

	import Keyboard from './keyboard/Keyboard.svelte';
	import ShuffledButtons from './ShuffledButtons.svelte';
	import Countdown from './Countdown.svelte';

	type Props = {
		timeInSeconds: number;
		showHints: boolean;
		end: (event: { scores: number; board: (Key | null)[] }) => void;
	};
	let { timeInSeconds, showHints, end }: Props = $props();

	let gameState = $state(createInitialState());

	let placedCount = $derived(getPlacedCount(gameState.board));

	function onTrayButtonClick(key: Key) {
		gameState = handleTrayButtonClick(gameState, key);
	}

	function onBoardButtonClick(index: number) {
		gameState = handleBoardButtonClick(gameState, index);
	}

	function onCountdownEnd() {
		const result = endGame(gameState);
		gameState = { ...gameState, isGameOver: true, scores: result.scores };
		end({
			scores: result.scores,
			board: result.board
		});
	}
</script>

<div class="flex flex-col gap-8">
	<!-- Stats Dashboard -->
	<div class="stats grid w-full grid-cols-3 bg-base-200 shadow-lg">
		<div class="stat place-items-center">
			<div class="stat-title">Time Left</div>
			<div class="stat-value text-primary">
				<Countdown {timeInSeconds} end={onCountdownEnd} />
			</div>
		</div>

		<div class="stat place-items-center">
			<div class="stat-title">Progress</div>
			<div class="stat-value">{placedCount} / {keys.length}</div>
			<div class="stat-desc">Keys Snap-fitted</div>
		</div>

		<div class="stat place-items-center">
			<div class="stat-title">Current Match</div>
			<div class="stat-value text-secondary">
				{gameState.selected ? gameState.selected.label : '--'}
			</div>
			<div class="stat-desc">Selected Key</div>
		</div>
	</div>

	<!-- Main Keyboard Workmat -->
	<div class="card overflow-hidden border-2 border-base-content/10 bg-base-200 shadow-xl">
		<div class="card-body p-2 sm:p-4">
			<h2 class="mb-2 card-title justify-center text-sm tracking-widest uppercase opacity-50">
				Keyboard Plate
			</h2>
			<Keyboard
				keys={gameState.board}
				onClick={onBoardButtonClick}
				selectedType={showHints ? gameState.selected?.type : null}
			/>
		</div>
	</div>

	<!-- Key Tray -->
	<div class="card border-2 border-dashed border-base-content/20 bg-base-200 shadow-inner">
		<div class="card-body p-4">
			<div class="mb-2 flex items-center justify-between">
				<h2 class="card-title text-sm tracking-widest uppercase opacity-50">Your Key Tray</h2>
				<button
					class="btn btn-ghost text-error btn-xs {gameState.selected ? '' : 'invisible'}"
					onclick={() => (gameState = { ...gameState, selected: null })}
				>
					Deselect
				</button>
			</div>
			<div class="h-64 overflow-y-auto">
				<ShuffledButtons
					keys={gameState.tray}
					onClick={onTrayButtonClick}
					selected={gameState.selected}
				/>
			</div>
		</div>
	</div>
</div>
