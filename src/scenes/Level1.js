export class Level1 extends Phaser.Scene {
    constructor(){
        super('Level1');
    }

    preload() {
        this.load.image('firtsImage', 'assets/napoleonBaby.png');
    }

    create() {
        const napoleonBaby = this.add.image(0, 0, 'firtsImage').setOrigin(0).setInteractive()

        const scaleNapoleonBabyX = this.cameras.main.width / napoleonBaby.width;
        const scaleNapoleonBabyY = this.cameras.main.height / napoleonBaby.height;

            // Use the smaller scale to maintain aspect ratio (fit inside)
        const napoleonBabyScale = Math.min(scaleNapoleonBabyX, scaleNapoleonBabyY);

        napoleonBaby.setScale(napoleonBabyScale);

        // Optionally center it if you want it centered
        napoleonBaby.x = (this.cameras.main.width - napoleonBaby.displayWidth) / 2;
        napoleonBaby.y = (this.cameras.main.height - napoleonBaby.displayHeight) / 2;

        
        napoleonBaby.on('pointerdown', () => {
            this.tweens.add({
                targets: napoleonBaby,
                alpha: 0,
                duration: 500,
                onComplete: () => {
                    napoleonBaby.destroy(); // eliminar después del fade out
                }
            });
        });
        
        
    }
}