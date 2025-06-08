import { Classes } from '../shared/Classes.js'
import { CutScene } from '../shared/CutScene.js'

export class Level2 extends Phaser.Scene {
    constructor(){
        super('Level2');
    }

    preload() {
        this.load.image('options', 'assets/options.png');
        this.load.image('oneIncorrectFirstCase', 'assets/oneIncorrectFirstCase.png');
        this.load.image('oneIncorrectSecondCase', 'assets/oneIncorrectSecondCase.png');
        this.load.image('twoIncorrect', 'assets/twoIncorrect.png');
        this.load.image('correctOptions', 'assets/selectedCorrectOption.png');
        this.load.image('nextButton', 'assets/nextScreen.png');

        this.cutScene = new CutScene(this);
        this.cutScene.preload(3);
    }

    create() {
        this.gameContainer = this.buildGame();

        this.cutScene.thirdScene(this.gameContainer);        
    }

    buildGame(){
        this.classScale = new Classes(this);

        const options = this.classScale.scaleImage(this.add.image(0, 0, 'options'), 1, 1, true, false, 0, 0);
        const oneIncorrectFirstCase = this.classScale.scaleImage(this.add.image(0, 0, 'oneIncorrectFirstCase'), 1, 1, true, false, 0, 0);
        const oneIncorrectSecondCase = this.classScale.scaleImage(this.add.image(0, 0, 'oneIncorrectSecondCase'), 1, 1, true, false, 0, 0);
        const twoIncorrect = this.classScale.scaleImage(this.add.image(0, 0, 'twoIncorrect'), 1, 1, true, false, 0, 0);
        const correctOption = this.classScale.scaleImage(this.add.image(0, 0, 'correctOptions'), 1, 1, true, false, 0, 0);
        const nextButtonImage = this.classScale.scaleImage(this.add.image(1070, 650, 'nextButton'), 7, 7, false, true, 0.5, 0.5);

        options.alpha = 1;
        oneIncorrectFirstCase.alpha = 0;
        oneIncorrectSecondCase.alpha = 0;
        twoIncorrect.alpha = 0;
        correctOption.alpha = 0;
        nextButtonImage.alpha = 0;

        this.gameContainer = this.add.container(0, 0, [options, oneIncorrectFirstCase, oneIncorrectSecondCase, twoIncorrect, correctOption, nextButtonImage]);        

        this.contador = 0;
        this.showedImage = options;

        this.input.keyboard.on('keydown', (event) => {
            if(event.key === '1'){
                this.tweens.add({
                    targets: correctOption,
                    alpha: 1,
                    duration: 0,
                    onComplete: () => {
                        this.showedImage.destroy();
                        nextButtonImage.alpha = 1;
                    }
                });
                this.classScale.buttonClass(nextButtonImage, () => {this.scene.start('Level3');});
            } else {
                if(!isNaN(event.key) && event.key.trim() !== '' && (event.key == '2' || event.key == '3') ){
                    this.contador++;
                    switch (this.contador) {
                        case 1:
                            if(event.key === '2'){
                                this.showedImage = oneIncorrectFirstCase;
                            } else if(event.key === '3'){
                                this.showedImage = oneIncorrectSecondCase;
                            }
                            this.tweens.add({
                                targets: this.showedImage,
                                alpha: 1,
                                duration: 0,
                                onComplete: () => {
                                    options.destroy();
                                }
                            });
                            break;
                        case 2:
                            this.tweens.add({
                                targets: twoIncorrect,
                                alpha: 1,
                                duration: 0,
                                onComplete: () => {
                                    oneIncorrectFirstCase.destroy();
                                    oneIncorrectSecondCase.destroy();
                                }
                            });
                            break;
                        case 3:
                            this.tweens.add({
                                targets: correctOption,
                                alpha: 1,
                                duration: 0,
                                onComplete: () => {
                                    twoIncorrect.destroy();
                                    nextButtonImage.alpha = 1;
                                }
                            });
                            this.classScale.buttonClass(nextButtonImage, () => {this.scene.start('Level3');});
                            break;
                    }
                }
            }
        });

        this.gameContainer.setAlpha(0);
        return this.gameContainer;
    }
}