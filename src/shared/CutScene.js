import { Classes } from './Classes.js'

export class CutScene{
    constructor(scene){
        this.scene = scene;
        this.classScale = new Classes(scene);

    }

    preload(scene) {
        this.scene.load.image('nextButton', 'assets/nextScreen.png');
        switch (scene){
            case 1:
                this.scene.load.image('background', 'assets/background.png');
                break;
            case 2:
                this.scene.load.image('napoleonBaby', 'assets/napoleonBaby.png');
                break;
            case 3:
                this.scene.load.image('kidNapoleon', 'assets/kidNapoleon.png');
                this.scene.load.image('lieutenantNapoleon', 'assets/lieutenantNapoleon.png');
                break;
            case 4:
                this.scene.load.image('commanderNapoleon', 'assets/commanderNapoleon.png');
                this.scene.load.image('horse', 'assets/horse.png');
                this.scene.load.image('flags', 'assets/flags.png');
                this.scene.load.image('death', 'assets/death.png');
                this.scene.load.image('credits', 'assets/credits.png');
                break;
        }  
    }

    firstScene(uiContainer){
        const background = this.classScale.scaleImage(this.scene.add.image(0, 0, 'background'), 1, 1, true, false, 0, 0);
        this.scene.tweens.add({
            targets: background,
            alpha: 0,
            duration: 3000,
            ease: 'Linear',
        });
        this.scene.tweens.add({
            targets: uiContainer,
            alpha: 1,
            duration: 0,
            ease: 'Linear',
            onComplete: () => {
                background.destroy();
            }
        });

    }

    secondScene(gameContainer){
        const napoleonBaby = this.classScale.scaleImage(this.scene.add.image(0, 0, 'napoleonBaby'), 1, 1, true, false, 0, 0);
        const nextButtonImage = this.classScale.scaleImage(this.scene.add.image(1070, 650, 'nextButton'), 7, 7, false, true, 0.5, 0.5);
        const nextButton = this.classScale.buttonClass(nextButtonImage,
            () => {
                this.scene.tweens.add({
                    targets: napoleonBaby,
                    alpha: 0,
                    ease: 'Linear',
                    duration: 500,
                });
                this.scene.tweens.add({
                    targets: gameContainer,
                    alpha: 1,
                    duration: 0,
                    ease: 'Linear',
                    onComplete: () => {
                        napoleonBaby.destroy();
                        nextButton.destroy();
                    }
                });
            }
        );
    }

    thirdScene(gameContainer){
        const kidNapoleon = this.classScale.scaleImage(this.scene.add.image(0, 0, 'kidNapoleon'), 1, 1, true, false, 0, 0);
        const lieutenantNapoleon = this.classScale.scaleImage(this.scene.add.image(0, 0, 'lieutenantNapoleon'), 1, 1, true, false, 0, 0);
        const nextButtonImage = this.classScale.scaleImage(this.scene.add.image(1070, 650, 'nextButton'), 7, 7, false, true, 0.5, 0.5);

        lieutenantNapoleon.alpha = 0;
        this.sceneStep = 0;

        this.classScale.buttonClass(nextButtonImage, () => {
                if (this.sceneStep === 0) {
                    this.scene.tweens.add({
                        targets: kidNapoleon,
                        alpha: 0,
                        duration: 0,
                        });
                        this.scene.tweens.add({
                        targets: lieutenantNapoleon,
                        alpha: 1,
                        duration: 0,
                        onComplete: () => {
                            kidNapoleon.destroy();
                            this.sceneStep = 1;
                        }
                    });
                }
                else if (this.sceneStep === 1) {
                    this.scene.tweens.add({
                        targets: lieutenantNapoleon,
                        alpha: 0,
                        duration: 0,
                        });
                    this.scene.tweens.add({
                        targets: gameContainer,
                        alpha: 1,
                        duration: 0,
                        onComplete: () => {
                            lieutenantNapoleon.destroy();
                            nextButtonImage.destroy();

                        }
                    });
                }
            }
        );
    }

    fourthScene(gameContainer){
        const commanderNapoleon = this.classScale.scaleImage(this.scene.add.image(0, 0, 'commanderNapoleon'), 1, 1, true, false, 0, 0);
        const horse = this.classScale.scaleImage(this.scene.add.image(0, 0, 'horse'), 1, 1, true, false, 0, 0);
        const flags = this.classScale.scaleImage(this.scene.add.image(0, 0, 'flags'), 1, 1, true, false, 0, 0);
        const nextButtonImage = this.classScale.scaleImage(this.scene.add.image(1070, 650, 'nextButton'), 7, 7, false, true, 0.5, 0.5);

        horse.alpha = 0;
        flags.alpha = 0;
        this.sceneStep = 0;

        this.classScale.buttonClass(nextButtonImage, () => {
                if (this.sceneStep === 0) {
                    this.scene.tweens.add({
                        targets: commanderNapoleon,
                        alpha: 0,
                        duration: 0,
                        });
                        this.scene.tweens.add({
                        targets: horse,
                        alpha: 1,
                        duration: 0,
                        onComplete: () => {
                            commanderNapoleon.destroy();
                            this.sceneStep = 1;
                        }
                    });
                }
                else if (this.sceneStep === 1) {
                    this.scene.tweens.add({
                        targets: horse,
                        alpha: 0,
                        duration: 0,
                        });
                    this.scene.tweens.add({
                        targets: flags,
                        alpha: 1,
                        duration: 0,
                        onComplete: () => {
                            horse.destroy();
                            this.sceneStep = 2;
                        }
                    });
                }
                else if (this.sceneStep === 2) {
                    this.scene.tweens.add({
                        targets: flags,
                        alpha: 0,
                        duration: 0,
                        });
                    this.scene.tweens.add({
                        targets: gameContainer,
                        alpha: 1,
                        duration: 0,
                        onComplete: () => {
                            flags.destroy();
                            nextButtonImage.destroy();
                        }
                    });
                }
            }
        );
    }

    lastScene(){
        let step = 0;

        const death   = this.classScale.scaleImage(
            this.scene.add.image(0,0,'death'),
            1,1,true,false,0,0
        );
        const credits = this.classScale.scaleImage(
            this.scene.add.image(0,0,'credits'),
            1,1,true,false,0,0
        );
        credits.alpha = 0;

        const nextBtn = this.classScale.scaleImage(
            this.scene.add.image(1070,650,'nextButton'),
            7,7,false,true,0.5,0.5
        );

        nextBtn.setInteractive({ useHandCursor: true })
                .on('pointerdown', () => {
            if (step === 0) {
            death.destroy();
            credits.setAlpha(1);
            step = 1;
            }
            else {
            this.scene.scene.start('Start');
            }
        });
    }
}