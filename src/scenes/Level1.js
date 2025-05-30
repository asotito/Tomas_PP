import { Classes } from '../shared/Classes.js'

export class Level1 extends Phaser.Scene {
    constructor(){
        super('Level1');
    }

    preload() {
        this.load.image('firtsImage', 'assets/napoleonBaby.png');
        this.load.image('firstOpp', 'assets/level1Start.png');
        this.load.image('firstError', 'assets/level1FirstError.png');
        this.load.image('secondError', 'assets/level1SecondError.png');
        this.load.image('thirdError', 'assets/level1ThirdError.png');
    }

    create() {
        this.classScale = new Classes(this);

        const napoleonBaby = this.classScale.scaleImage(this.add.image(0, 0, 'firtsImage'), 1, 1, true, true, 0, 0);
        const firstOpp = this.classScale.scaleImage(this.add.image(0, 0, 'firstOpp'), 1, 1, true, true, 0, 0);
        const firstError = this.classScale.scaleImage(this.add.image(0, 0, 'firstError'), 1, 1, true, true, 0, 0);
        const secondError = this.classScale.scaleImage(this.add.image(0, 0, 'secondError'), 1, 1, true, true, 0, 0);
        const thirdError = this.classScale.scaleImage(this.add.image(0, 0, 'thirdError'), 1, 1, true, true, 0, 0);

        firstOpp.alpha = 0;
        firstError.alpha = 0;
        secondError.alpha = 0;
        thirdError.alpha = 0;

        napoleonBaby.on('pointerdown', () => {
            this.tweens.add({
                targets: napoleonBaby,
                alpha: 0,
                duration: 500,
                onComplete: () => {
                    napoleonBaby.destroy(); // eliminar después del fade out
                }
            });
            this.tweens.add({
                targets: firstOpp,
                alpha: 1,
                duration: 500,
            });
        });

        this.contador = 0;
        this.showedImage = firstOpp;

        this.input.keyboard.on('keydown', (event) => {
            if(event.key === '1'){
                this.tweens.add({
                    targets: this.showedImage,
                    alpha: 0,
                    duration: 500,
                    onComplete: () => {
                        this.showedImage.destroy(); // eliminar después del fade out
                }
            });
            } else {
                this.contador++;
                console.log();
                switch (this.contador) {
                    case 1:
                        this.showedImage = firstError;
                        this.tweens.add({
                            targets: this.showedImage,
                            alpha: 1,
                            duration: 500,
                            onComplete: () => {
                                firstOpp.destroy();
                            }
                        });
                        break;
                    case 2:
                        this.showedImage = secondError;
                        this.tweens.add({
                            targets: this.showedImage,
                            alpha: 1,
                            duration: 500,
                            onComplete: () => {
                                firstError.destroy();
                            }
                        });
                        break;
                    case 3:
                        this.showedImage = thirdError;
                        this.tweens.add({
                            targets: this.showedImage,
                            alpha: 1,
                            duration: 500,
                            onComplete: () => {
                                secondError.destroy();
                            }
                        });
                        break;
                    }
            }
        });
    }
}