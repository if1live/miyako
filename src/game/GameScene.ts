import Phaser from 'phaser';
import { store } from '../helpers';
import * as A from '../actions';

// https://labs.phaser.io/view.html?src=src\input\mouse\click%20sprite.js
// https://medium.freecodecamp.org/how-to-build-a-simple-game-in-the-browser-with-phaser-3-and-typescript-bdc94719135
export class GameScene extends Phaser.Scene {
	text: Phaser.GameObjects.Text | undefined;
	outgameSprite: Phaser.GameObjects.Sprite | undefined;
	gameSprite: Phaser.GameObjects.Sprite | undefined;
	ingameSprite: Phaser.GameObjects.Sprite | undefined;

	public preload() {
		this.load.image('raster', 'assets/raster-bw-800x16.png');
		this.load.image('eye', 'assets/lance-overdose-loader-eye.png');
	}

	public create() {
		const group = this.add.group();

		group.createMultiple({ key: 'raster', repeat: 64 });

		const hsv = Phaser.Display.Color.HSVColorWheel();

		let i = 0;

		const _this = this;

		group.children.iterate((x) => {
			const child = x as Phaser.GameObjects.Image;

			child.x = 500;
			child.y = 100;
			child.depth = 64 - i;
			child.scaleX = 0.6;
			child.setBlendMode(Phaser.BlendModes.ADD);

			// child.setTint(hsv[i * 4].color);

			i++;

			_this.tweens.add({
				targets: child,
				props: {
					x: { value: 300, duration: 700 },
					y: { value: 500, duration: 2500 },
					scaleX: { value: Math.min(0.1, child.depth / 64), duration: 4000, hold: 2000, delay: 2000 }
				},
				yoyo: true,
				repeat: -1,
				ease: 'Sine.easeInOut',
				delay: 38 * i
			});
		});

		this.outgameSprite = this.add.sprite(600, 30, 'eye').setInteractive();
		this.outgameSprite.scaleX = 0.3;
		this.outgameSprite.scaleY = 0.3;
		this.outgameSprite.on('pointerdown', () => store.dispatch(A.outgameCheck()));

		this.gameSprite = this.add.sprite(650, 30, 'eye').setInteractive();
		this.gameSprite.scaleX = 0.3;
		this.gameSprite.scaleY = 0.3;
		this.gameSprite.on('pointerdown', () => store.dispatch(A.gameCheck()));

		this.ingameSprite = this.add.sprite(700, 30, 'eye').setInteractive();
		this.ingameSprite.scaleX = 0.3;
		this.ingameSprite.scaleY = 0.3;
		this.ingameSprite.on('pointerdown', () => store.dispatch(A.ingameCheck()));

		this.text = this.add.text(700, 50, 'game');
		this.text.setTint(0xff00ff, 0xffff00, 0x0000ff, 0xff0000);
	}

	public update() {
		const state = store.getState();
		this.text!.text = `game: ${state.game}`;
	}
}
