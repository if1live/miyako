import {
	bindActionCreators,
	Dispatch,
} from 'redux';

import {
	connect,
} from 'react-redux';

import { State } from '../reducers';
import { Game } from '../components';
import * as A from '../actions';

function mapStateToProps(state: State) {
	return {
		game: state.game,
	};
}

function mapDispatchToProps(dispatch: Dispatch) {
	return bindActionCreators({
		outgameCheck: A.outgameCheck,
		gameCheck: A.gameCheck,
		ingameCheck: A.ingameCheck,
	}, dispatch);
}

export const GameContainer = connect(mapStateToProps, mapDispatchToProps)(Game);

