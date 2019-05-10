import {
	bindActionCreators,
	Dispatch,
} from 'redux';

import {
	connect,
} from 'react-redux';

import { State } from '../reducers';
import { App } from '../components';

function mapStateToProps(state: State) {
	return {};
}

function mapDispatchToProps(dispatch: Dispatch) {
	return bindActionCreators({
	}, dispatch);
}

export const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);
