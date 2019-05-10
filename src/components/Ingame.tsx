import React from 'react';
import * as A from '../actions';

interface Props {
	ingame: number;

	outgameCheck: typeof A.outgameCheck;
	gameCheck: typeof A.gameCheck;
	ingameCheck: typeof A.ingameCheck;
}

export const Ingame: React.FC<Props> = (props: Props) => {
	const {
		ingame,
		outgameCheck,
		gameCheck,
		ingameCheck,
	} = props;

	return (
		<div>
			<h2>ingame: {ingame}</h2>
			<ul>
				<li><button onClick={outgameCheck}>check outgame</button></li>
				<li><button onClick={gameCheck}>check game</button></li>
				<li><button onClick={ingameCheck}>check ingame</button></li>
			</ul>
		</div>
	);
}
