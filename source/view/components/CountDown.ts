export default class CountDown extends Phaser.GameObjects.Container {
    icone : Phaser.GameObjects.Image
    number : Phaser.GameObjects.Text
    counter : number

    constructor(scene : Phaser.Scene, x : number, y : number, time : number) {
        super(scene, x, y)
        this.init(time)
    }

    init(time : number) : any {
        this.counter = time
        this.icone = new Phaser.GameObjects.Image(this.scene, 0, 0, "icone-chrono")
        this.number = new Phaser.GameObjects.Text(this.scene, this.icone.width + 10, 0, this.counter + "", {color : "#fff"})
        this.number.setOrigin(0.5)
        this.add(this.icone)
        this.add(this.number)
        setInterval(() => {
            this.counter > 0 ?this.counter -= 1 : null
        }, 1000)
    }

    update() : any {
        this.number.setText(this.counter + "")
    }
}