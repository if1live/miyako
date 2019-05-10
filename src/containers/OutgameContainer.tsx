import {
	bindActionCreators,
	Dispatch,
} from 'redux';

import {
	connect,
} from 'react-redux';

import { State } from '../reducers';
import { Outgame } from '../components';
import * as A from '../actions';

function mapStateToProps(state: State) {
	return {
		outgame: state.outgame,
	};
}

function mapDispatchToProps(dispatch: Dispatch) {
	return bindActionCreators({
		outgameCheck: A.outgameCheck,
		gameCheck: A.gameCheck,
		ingameCheck: A.ingameCheck,
	}, dispatch);
}

export const OutgameContainer = connect(mapStateToProps, mapDispatchToProps)(Outgame);

