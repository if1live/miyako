import {
	createStandardAction,
	ActionType,
} from 'typesafe-actions';

export const outgameCheck = createStandardAction('OUTGAME_CHECK')();
export const ingameCheck = createStandardAction('INGAME_CHECK')();
export const gameCheck = createStandardAction('GAME_CHECK')();

const actions = {
	outgameCheck,
	ingameCheck,
	gameCheck,
};

export type RootAction = ActionType<typeof actions>;
