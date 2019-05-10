import React, { useState } from 'react';
import { GameContainer } from '../containers';
import * as A from '../actions';

interface Props {
	outgame: number;

	outgameCheck: typeof A.outgameCheck;
	gameCheck: typeof A.gameCheck;
	ingameCheck: typeof A.ingameCheck;
}

export const Outgame: React.FC<Props> = (props: Props) => {
	const [gameVisible, setGameVisible] = useState(true);

	const {
		outgame,
		outgameCheck,
		gameCheck,
		ingameCheck,
	} = props;

	const handleToggle = () => {
		setGameVisible(!gameVisible);
	};

	return (
		<div>
			<h2>outgame: {outgame}</h2>
			<ul>
				<li><button onClick={handleToggle}>toggle game</button></li>
				<li><button onClick={outgameCheck}>check outgame</button></li>
				<li><button onClick={gameCheck}>check game</button></li>
				<li><button onClick={ingameCheck}>check ingame</button></li>
			</ul>

			{gameVisible ? <GameContainer /> : null}
		</div>
	);
}
