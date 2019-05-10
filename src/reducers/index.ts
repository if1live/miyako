import {
	RootAction,
	outgameCheck,
	ingameCheck,
	gameCheck,
} from '../actions';
import { getType } from 'typesafe-actions';

export interface State {
	outgame: number;
	ingame: number;
	game: number;
}

const initialState: State = {
	outgame: 0,
	ingame: 0,
	game: 0,
};

export function reducer(state = initialState, action: RootAction): State {
	switch (action.type) {
		case getType(outgameCheck): {
			return {
				...state,
				outgame: state.outgame + 1,
			};
		}
		case getType(ingameCheck): {
			return {
				...state,
				ingame: state.ingame + 1,
			};
		}
		case getType(gameCheck): {
			return {
				...state,
				game: state.game + 1,
			};
		}
		default:
			return state;
	}
}
