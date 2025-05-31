import { Classes } from './Classes.js'

export class CutScene{
    constructor(scene){
        this.scene = scene;
        this.classScale = new Classes(scene);

    }

    preload(scene) {
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
                this.scene.load.image('commanderNapoleon', 'assets/commanderNapoleon.png');
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
            duration: 3000,
            ease: 'Linear',
            onComplete: () => {
                background.destroy();
            }
        });

    }

    secondScene(gameContainer){
        const napoleonBaby = this.classScale.scaleImage(this.scene.add.image(0, 0, 'napoleonBaby'), 1, 1, true, true, 0, 0);
        napoleonBaby.on('pointerdown', () => {
            this.scene.tweens.add({
                targets: napoleonBaby,
                alpha: 0,
                ease: 'Linear',
                duration: 500,
            });
            this.scene.tweens.add({
                targets: gameContainer,
                alpha: 1,
                duration: 500,
                ease: 'Linear',
                onComplete: () => {
                    napoleonBaby.destroy();
                }
            });
        });
    }

    thirdScene(gameContainer){
        const kidNapoleon = this.classScale.scaleImage(this.scene.add.image(0, 0, 'kidNapoleon'), 1, 1, true, true, 0, 0);
        const lieutenantNapoleon = this.classScale.scaleImage(this.scene.add.image(0, 0, 'lieutenantNapoleon'), 1, 1, true, true, 0, 0);
        const commanderNapoleon = this.classScale.scaleImage(this.scene.add.image(0, 0, 'commanderNapoleon'), 1, 1, true, true, 0, 0);

        lieutenantNapoleon.alpha = 0;
        commanderNapoleon.alpha = 0;

        kidNapoleon.on('pointerdown', () => {
            this.scene.tweens.add({
                targets: kidNapoleon,
                alpha: 0,
                ease: 'Linear',
                duration: 500,
            });
            this.scene.tweens.add({
                targets: lieutenantNapoleon,
                alpha: 1,
                duration: 500,
                ease: 'Linear',
                onComplete: () => {
                    kidNapoleon.destroy();
                }
            });
        });
        lieutenantNapoleon.on('pointerdown', () => {
            this.scene.tweens.add({
                targets: lieutenantNapoleon,
                alpha: 0,
                ease: 'Linear',
                duration: 500,
            });
            this.scene.tweens.add({
                targets: commanderNapoleon,
                alpha: 1,
                duration: 500,
                ease: 'Linear',
                onComplete: () => {
                    lieutenantNapoleon.destroy();
                }
            });
        });
        commanderNapoleon.on('pointerdown', () => {
            this.scene.tweens.add({
                targets: commanderNapoleon,
                alpha: 0,
                ease: 'Linear',
                duration: 500,
            });
            this.scene.tweens.add({
                targets: gameContainer,
                alpha: 1,
                duration: 500,
                ease: 'Linear',
                onComplete: () => {
                    commanderNapoleon.destroy();
                }
            });
        });
    }
}