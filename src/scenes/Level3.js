import { Classes } from '../shared/Classes.js'
import { CutScene } from '../shared/CutScene.js'

export class Level3 extends Phaser.Scene{
    constructor(){
        super('Level3');
    }

    preload() {
        this.load.image('nBoat', 'assets/napoleonBoat.png');
        this.load.image('eBoats', 'assets/enemyBoats.png');
        this.load.image('backgroundGame', 'assets/backgroundGame.png');
        this.load.image('nextButton', 'assets/nextScreen.png');
        this.load.image('finishLine', 'assets/finishLine.png')

        this.cutScene = new CutScene(this);
        this.cutScene.preload(4);
    }

    create() {
        this.gameContainer = this.buildGame();

        this.cutScene.fourthScene(this.gameContainer);        
    }

    buildGame(){
        this.classScale = new Classes(this);

        const background = this.classScale.scaleImage(this.add.image(0, 0, 'backgroundGame'), 1, 1, true, false, 0, 0);
        this.finishLine = this.classScale.scaleImage(this.add.image(950, 260, 'finishLine'), 12, 1, false, false, 0, 0);
        this.player = this.classScale.scaleImage(this.add.image(200, 360, 'nBoat'), 12, 12, false, false, 0, 0);

        this.gameContainer = this.add.container(0, 0, [background, this.finishLine, this.player]);        

        this.physics.add.existing(this.player);
        this.physics.add.existing(this.finishLine);
        this.player.body.setCollideWorldBounds(true).setImmovable(true).setAllowGravity(false);
        this.player.startX = this.player.x;
        this.player.startY = this.player.y;
        

        this.boats = [
            this.classScale.scaleImage(this.add.image(430, 185, 'eBoats'), 10, 10, false, false, 0, 0),
            this.classScale.scaleImage(this.add.image(650, 185, 'eBoats'), 10, 10, false, false, 0, 0),
            this.classScale.scaleImage(this.add.image(870, 185, 'eBoats'), 10, 10, false, false, 0, 0)
        ]

        this.physics.world.setBounds(0, 185, this.scale.width, this.scale.height-185);

        this.boats.forEach((boat, i) => {
            this.physics.add.existing(boat);
            boat.body.setCollideWorldBounds(true);
            boat.body.setBounce(1, 1);
            boat.body.setVelocityY(130 + i * 100);
        });

        this.physics.add.overlap(
            this.player,
            this.boats,
            this.handleCollision,
            null,
            this
        );

        this.physics.add.overlap(
            this.player,
            this.finishLine,
            () => this.handleCollisionLine(this.gameContainer),
            null,
            this
        );

        this.moveSpeed = 200;
        this.cursors = this.input.keyboard.createCursorKeys();
        this.keysWASD = this.input.keyboard.addKeys({
            up: 'W', left: 'A', down: 'S', right: 'D'
        });
        
        return this.gameContainer;
    }

    update(time, delta) {
        const dt = delta / 1000;
        let dx = 0, dy = 0;

        if (this.cursors.left.isDown  || this.keysWASD.left.isDown)  dx = -this.moveSpeed * dt;
        if (this.cursors.right.isDown || this.keysWASD.right.isDown) dx =  this.moveSpeed * dt;
        if (this.cursors.up.isDown    || this.keysWASD.up.isDown)    dy = -this.moveSpeed * dt;
        if (this.cursors.down.isDown  || this.keysWASD.down.isDown)  dy =  this.moveSpeed * dt;

        // mueve el sprite correctamente
        this.player.x += dx;
        this.player.y += dy;

        this.player.x = Phaser.Math.Clamp(this.player.x, 200, 950);
        this.player.y = Phaser.Math.Clamp(this.player.y, 185, 720-60);
    }

    handleCollision(player) {
        player.x = player.startX;
        player.y = player.startY;
    }

    handleCollisionLine(gameContainer) {
        gameContainer.setVisible(false);
        this.cutScene.lastScene();
    }
}