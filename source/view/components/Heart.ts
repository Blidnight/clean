export default class Heart extends Phaser.GameObjects.Image {
    constructor(scene : Phaser.Scene, x : number, y : number, position : number) {
        super(scene, x, y, "icone-coeur")
        this.x = position * this.width
    }
}