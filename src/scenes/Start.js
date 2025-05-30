import { Classes } from '../shared/Classes.js'

export class Start extends Phaser.Scene {

    constructor() {
        super('Start');
    }

    preload() {
        this.load.image('background', 'assets/background.png');
        this.load.image('blurBackground', 'assets/blurBackground.png');
        this.load.image('title', 'assets/titleText.png');
        this.load.image('start', 'assets/startButton.png');
        this.load.image('description', 'assets/descriptionButton.png');
    }

    create() {
        this.classScale = new Classes(this);
        
        const blurBackground = this.classScale.scaleImage(this.add.image(0, 0, 'blurBackground'), 1, 1, true, false, 0, 0);

        const title = this.classScale.scaleImage(this.add.image(160, -250, 'title'), 1, 1, false, false, 0, 0);

        const start = this.classScale.scaleImage(this.add.image(640, 380, 'start'), 3, 3, false, true, 0.5, 0.5);

        const description = this.classScale.scaleImage(this.add.image(640, 540, 'description'), 3, 3, false, true, 0.5, 0.5);

        const startScaleX = start.scaleX;
        const startScaleY = start.scaleY;

        const descriptionScaleX = description.scaleX;
        const descriptionScaleY = description.scaleY;

        start.on('pointerdown', () => {
            this.tweens.add({
            targets: start,
            scaleX: startScaleX / 2,
            scaleY: startScaleY / 2,
            duration: 100,
            yoyo: true,
            ease: 'Power1'
            })
            this.time.delayedCall(
                1000,
                () => {
                    this.scene.start('Level1');
                }
            )
        });

        description.on('pointerdown', () => {
            this.tweens.add({
            targets: description,
            scaleX: descriptionScaleX / 2,
            scaleY: descriptionScaleY / 2,
            duration: 100,
            yoyo: true,
            ease: 'Power1'
            })
            this.time.delayedCall(
                1000,
                () => {
                    this.scene.start('Level1');
                }
            )
        });

        const background = this.classScale.scaleImage(this.add.image(0, 0, 'background'), 1, 1, true, false, 0, 0);
        
        this.tweens.add({
            targets: background,
            alpha: 0,          // final: totalmente invisible
            duration: 3000,    // duración en milisegundos (2 segundos)
            ease: 'Linear'
        });
    }
    
}
