import Phaser from 'phaser';
import React, { useState } from 'react';
import './App.css';
import { PhaserGame } from './PhaserGame';
import { GameScene } from './GameScene';

const App: React.FC = () => {
	const [gameVisible, setGameVisible] = useState(true);
	const [counter, setCounter] = useState(0);

	const handleToggle = () => {
		setGameVisible(!gameVisible);
	};

	const handleCounter = () => {
		setCounter(counter + 1);
	}

	return (
		<div className="App">
			<div>
				<h2>game</h2>
				<button onClick={handleToggle}>toggle game</button>
				<span>counter: {counter}</span>
			</div>

			{gameVisible ? <PhaserGame handleCounter={handleCounter} /> : null}
		</div>
	);
}

// 게임은 1번만 초기화 시킬것
const game = new Phaser.Game({
	type: Phaser.AUTO,
	parent: 'phaser-example',
	width: 800,
	height: 600,
	scene: GameScene,
});

export default App;
