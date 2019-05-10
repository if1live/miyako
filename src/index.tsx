import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { store } from './helpers';
import { AppContainer } from './containers';
import { GameScene } from './game';
import Phaser from 'phaser';

const AppRouter: React.FC = () => {
	return (
		<Provider store={store}>
			<AppContainer />
		</Provider>
	);
};

ReactDOM.render(<AppRouter />, document.getElementById('root'));

// 게임은 1번만 초기화 시킬것
const game = new Phaser.Game({
	type: Phaser.AUTO,
	parent: 'phaser-example',
	width: 800,
	height: 600,
	scene: GameScene,
});

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
