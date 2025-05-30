import { Start } from './scenes/Start.js';
import { Level1 } from './scenes/Level1.js';
import { Classes } from './shared/Classes.js';

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
        Classes
    ],
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
}

new Phaser.Game(config);
            