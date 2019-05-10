import Phaser from 'phaser';

// https://labs.phaser.io/view.html?src=src\input\mouse\click%20sprite.js
// https://medium.freecodecamp.org/how-to-build-a-simple-game-in-the-browser-with-phaser-3-and-typescript-bdc94719135
export class GameScene extends Phaser.Scene {
	public preload() {
		this.load.image('raster', '/assets/raster-bw-800x16.png');
		this.load.image('eye', '/assets/lance-overdose-loader-eye.png');
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

		const sprite = this.add.sprite(600, 100, 'eye').setInteractive();

		sprite.on('pointerdown', function (pointer: any) {
			sprite.setTint(0xff0000);
			// this.setTint(0xff0000);
		});

		sprite.on('pointerout', function (pointer: any) {
			sprite.clearTint();
			// this.clearTint();

		});

		sprite.on('pointerup', function (pointer: any) {
			sprite.clearTint();
			// this.clearTint();
		});
	}

	public update() {

	}
}
