import { Classes } from '../shared/Classes.js'
import { CutScene } from '../shared/CutScene.js'

export class Level1 extends Phaser.Scene {
    constructor(){
        super('Level1');
    }

    preload() {
        this.load.image('firstOpp', 'assets/level1Start.png');
        this.load.image('firstError', 'assets/level1FirstError.png');
        this.load.image('secondError', 'assets/level1SecondError.png');
        this.load.image('thirdError', 'assets/level1ThirdError.png');
        this.load.image('correctOption', 'assets/level1CorrectOption.png');

        this.cutScene = new CutScene(this);
        this.cutScene.preload(2);
    }

    create() {
        this.gameContainer = this.buildGame();

        this.cutScene.secondScene(this.gameContainer);        
    }

    buildGame(){
        this.classScale = new Classes(this);

        const firstOpp = this.classScale.scaleImage(this.add.image(0, 0, 'firstOpp'), 1, 1, true, true, 0, 0);
        const firstError = this.classScale.scaleImage(this.add.image(0, 0, 'firstError'), 1, 1, true, true, 0, 0);
        const secondError = this.classScale.scaleImage(this.add.image(0, 0, 'secondError'), 1, 1, true, true, 0, 0);
        const thirdError = this.classScale.scaleImage(this.add.image(0, 0, 'thirdError'), 1, 1, true, true, 0, 0);
        const correctOption = this.classScale.scaleImage(this.add.image(0, 0, 'correctOption'), 1, 1, true, true, 0, 0);

        firstOpp.alpha = 1;
        firstError.alpha = 0;
        secondError.alpha = 0;
        thirdError.alpha = 0;
        correctOption.alpha = 0;

        this.gameContainer = this.add.container(0, 0, [firstOpp, firstError, secondError, thirdError, correctOption]);        

        this.contador = 0;
        this.showedImage = firstOpp;

        this.input.keyboard.on('keydown', (event) => {
            if(event.key === '1'){
                this.tweens.add({
                    targets: correctOption,
                    alpha: 1,
                    duration: 0,
                    onComplete: () => {
                        this.showedImage.destroy();
                    }
                });
                this.time.delayedCall(
                    1000,
                    () => {
                        this.scene.start('Level2');
                    }
                );
            } else {
                if(!isNaN(event.key) && event.key.trim() !== ''){
                    this.contador++;
                    console.log(this.contador);
                    switch (this.contador) {
                        case 1:
                            this.showedImage = firstError;
                            this.tweens.add({
                                targets: this.showedImage,
                                alpha: 1,
                                duration: 0,
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
                                duration: 0,
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
                                duration: 0,
                                onComplete: () => {
                                    secondError.destroy();
                                }
                            });
                            break;
                        case 4:
                            this.tweens.add({
                                targets: correctOption,
                                alpha: 1,
                                duration: 0,
                                onComplete: () => {
                                    thirdError.destroy();
                                }
                            });
                            this.time.delayedCall(
                                1000,
                                () => {
                                    this.scene.start('Level2');
                                }
                            )
                            break;
                    }
                }
            }
        });

        this.gameContainer.setAlpha(0);
        return this.gameContainer;
    }
}