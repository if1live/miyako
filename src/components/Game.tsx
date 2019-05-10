import React, { useEffect, CSSProperties } from 'react';
import { IngameContainer } from '../containers';

export const Game: React.FC = () => {
	useEffect(() => {
		// mount
		const holder = document.querySelector('#gameHolder')!;
		const gameNode = document.querySelector('#phaser-example')!;
		const container = document.querySelector('#container')!;

		holder.removeChild(gameNode);
		container.appendChild(gameNode);

		// unmount
		return function cleanup() {
			const holder = document.querySelector('#gameHolder')!;
			const gameNode = document.querySelector('#phaser-example')!;
			gameNode.parentElement!.removeChild(gameNode);
			holder.appendChild(gameNode);
		};
	});

	const wrapperStyle: CSSProperties = {
		position: 'relative',
	};

	const innerStyle: CSSProperties = {
		position: 'absolute',
		top: 0,
		left: 0,
		color: 'white',
	};

	return (
		<div style={wrapperStyle}>
			<div id="container" />
			<div style={innerStyle}>
				<IngameContainer />
			</div>
		</div>
	);
};
