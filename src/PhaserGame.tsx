import React, { useEffect, CSSProperties } from 'react';

interface Props {
	handleCounter: () => void;
}

export class PhaserGame extends React.Component<Props> {
	componentDidMount() {
		const holder = document.querySelector('#gameHolder')!;
		const gameNode = document.querySelector('#phaser-example')!;
		const container = document.querySelector('#container')!;

		holder.removeChild(gameNode);
		container.appendChild(gameNode);
	}

	componentWillUnmount() {
		const holder = document.querySelector('#gameHolder')!;
		const gameNode = document.querySelector('#phaser-example')!;
		gameNode.parentElement!.removeChild(gameNode);
		holder.appendChild(gameNode);
	}

	render() {
		const wrapperStyle: CSSProperties = {
			position: 'relative',
		};

		const innerStyle: CSSProperties = {
			position: 'absolute',
			top: 0,
			left: 0,
			color: 'white',
		};

		const { handleCounter } = this.props;

		return (
			<div style={wrapperStyle}>
				<div id="container" />
				<div style={innerStyle}>
					<button onClick={handleCounter}>counter</button>
				</div>
			</div>
		);
	}
}
