import { LevelInterface } from "view/LevelInterface"
import Main from "scene/Main"

export default class RestartButton extends Phaser.GameObjects.Image {
    scene : Main
    constructor(scene : Main, x : number, y : number, container : LevelInterface) {
        super(scene, x, y, "bt-recommencer")
        this.x = 640 - this.width
 
        this.setOrigin(0)
        this.setInteractive()
        this.on('pointerdown', () => {
            container.countdown.counter = 20
            container.heart = 3
            this.scene.character.x = 120
            this.scene.character.y = 550
        })
        container.add(this)
    }
}