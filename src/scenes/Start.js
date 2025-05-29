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
        //Blur background section
        const blurBackground = this.add.image(0, 0, 'blurBackground').setOrigin(0);

            // Scale it to fill the game canvas
        const scaleBlurBackgroundX2 = this.cameras.main.width / blurBackground.width;
        const scaleBlurBackgroundY2 = this.cameras.main.height / blurBackground.height;

            // Use the smaller scale to maintain aspect ratio (fit inside)
        const blurBackgroundScale = Math.min(scaleBlurBackgroundX2, scaleBlurBackgroundY2);

        blurBackground.setScale(blurBackgroundScale);

        // Optionally center it if you want it centered
        blurBackground.x = (this.cameras.main.width - blurBackground.displayWidth) / 2;
        blurBackground.y = (this.cameras.main.height - blurBackground.displayHeight) / 2;

        //Title text section
        const title = this.add.image(640, 100, 'title');

        title.setScale(0.8);

        //Buttons section
            //Start button
        const start = this.add.image(630, 330, 'start').setInteractive();

        start.setScale(0.8);

        start.on('pointerdown', () => {
            this.tweens.add({
            targets: start,
            scale: 0.6,
            duration: 100,
            yoyo: true,
            ease: 'Power1'
            }),
            this.scene.start('Level1');
        });

        start.on('pointerup', () => {
            this.tweens.add({
                targets: start,
                scale: 0.8,
                duration: 100,
                ease: 'Power1'
            });    
        });

            //Description button
        const description = this.add.image(588, 410, 'description');

        description.setScale(0.8);


        //Background section
        const background = this.add.image(0, 0, 'background').setOrigin(0);

            // Scale it to fill the game canvas
        const scaleBackgroundX = this.cameras.main.width / background.width;
        const scaleBackgroundY = this.cameras.main.height / background.height;

            // Use the smaller scale to maintain aspect ratio (fit inside)
        const backgroundScale = Math.min(scaleBackgroundX, scaleBackgroundY);

        background.setScale(backgroundScale);

        background.x = (this.cameras.main.width - background.displayWidth) / 2;
        background.y = (this.cameras.main.height - background.displayHeight) / 2;

        background.alpha = 1;
        
        this.tweens.add({
            targets: background,
            alpha: 0,          // final: totalmente invisible
            duration: 3000,    // duración en milisegundos (2 segundos)
            ease: 'Linear'
        });
    }
    
}
