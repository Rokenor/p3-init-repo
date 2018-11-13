import Phaser from 'phaser'
import BootScene from './scenes/BootScene'
import MenuScene from './scenes/MenuScene'
import GameScene from './scenes/GameScene'
import ArcadeScene from './scenes/ArcadeScene'

// var config = {
//     type: Phaser.AUTO,
//     width:1024,
//     height: 768,
//     backgroundColor: 0xffdeb9,
//     physics: {
//         default: 'arcade',
//         arcade: {
//             gravity: {
//                 y : 300 
//             },
//             debug: false
//         }
//     },
//     scene: [
//         BootScene,
//         MenuScene,
//         GameScene
//     ]
// }

var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {
                y: 300
            },
            debug: false
        }
    },
    scene: [
        ArcadeScene
    ]
}

window.game = new Phaser.Game(config)
