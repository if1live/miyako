import {
	createStore,
	applyMiddleware,
} from 'redux';

import {
	RootAction,
} from '../actions';

import {
	reducer,
	State,
} from '../reducers';


function configureStore() {
	const store = createStore(
		reducer,
	);

	return store;
}

export const store = configureStore();
