import {
	bindActionCreators,
	Dispatch,
} from 'redux';

import {
	connect,
} from 'react-redux';

import { State } from '../reducers';
import { Ingame } from '../components';
import * as A from '../actions';

function mapStateToProps(state: State) {
	return {
		ingame: state.ingame,
	};
}

function mapDispatchToProps(dispatch: Dispatch) {
	return bindActionCreators({
		outgameCheck: A.outgameCheck,
		gameCheck: A.gameCheck,
		ingameCheck: A.ingameCheck,
	}, dispatch);
}

export const IngameContainer = connect(mapStateToProps, mapDispatchToProps)(Ingame);

