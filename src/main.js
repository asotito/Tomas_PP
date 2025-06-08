import { Start } from './scenes/Start.js';
import { Level1 } from './scenes/Level1.js';
import { Classes } from './shared/Classes.js';
import { CutScene } from './shared/CutScene.js';
import { Level2 } from './scenes/Level2.js';
import { Level3 } from './scenes/Level3.js';

const config = {
    type: Phaser.AUTO,
    title: 'Napoleon Guessing Game',
    description: '',
    parent: 'game-container',
    width: 1280,
    height: 720,
    backgroundColor: '#000000',
    pixelArt: false,
    scene: [
        Start,
        Level1,
        Level2,
        Level3,
        Classes,
        CutScene
    ],
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: 'arcade',
        arcade: {
        gravity: { y: 0 },
        debug: false
        }
    },
}

new Phaser.Game(config);
            