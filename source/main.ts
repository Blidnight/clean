import Phaser from 'phaser'
import Main from './scene/Main'
import Prisonnier from './entity/Prisonnier'


const config = {
    width: 800,
    height: 600,
    scene: [Main],
    physics: {
        default: "arcade",
        arcade: {
            debug : false,
            gravity: {
                y: 500
            }
        }

    }
}

const game = new Phaser.Game(config)
export default config