const direction = [
    {x : 0, y : 1, angle : 0},
    {x : 0, y : -1, angle : 0},
    {x : 1, y : 0, angle : -90},
    {x : -1, y : 0, angle : 90}
]

export default class Piege extends Phaser.GameObjects.Sprite {
    body: Phaser.Physics.Arcade.StaticBody
    direction : number

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, group: Phaser.Physics.Arcade.StaticGroup, dir : number) {
        super(scene, x, y, texture)
        this.direction = dir
        
        scene.add.existing(this)
        group.add(this)
        this.addMask()
        this.setOrigin(0)
        this.setAngle(direction[this.direction].angle)

        if (this.angle > 0) this.x += this.width
        else if (this.angle < 0) {
            //this.x -= this.width
            this.y += this.height
        }

        this.body.setOffset(this.width / 2, this.height / 2)

        let starter = Phaser.Math.Between(0, 1)
        let starter2 = Phaser.Math.Between(0, 1)

        if (starter2 === 1)  {
            this.x = this.x + this.width * direction[this.direction].x
            this.y = this.y + this.height * direction[this.direction].y
            setTimeout(() => this.show(), 1500)
        } else {
            setTimeout(() => this.hide(), 1500)
        }
        
        
    }

    addMask(): void {
        let maskGraphics = this.scene.add.graphics().setAlpha(0)
        maskGraphics.fillStyle(0xFF, 1)
        maskGraphics.fillRect(0, 0, this.width, this.height)
        maskGraphics.x = this.x
        maskGraphics.y = this.y
        let mask = new Phaser.Display.Masks.GeometryMask(this.scene, maskGraphics)
        this.mask = mask
    }

    hide(): void {
        this.body.enable = false
        this.scene.tweens.add({
            targets: this,
            x : this.x + this.width * direction[this.direction].x,
            y: this.y + this.height * direction[this.direction].y,
            duration: 200,
            onComplete: () => {
                setTimeout(() => {
                    this.show()
                }, 1500)
            }
        })
    }

    show(): void {
        this.scene.tweens.add({
            targets: this,
            x : this.x - this.width * direction[this.direction].x,
            y: this.y - this.height * direction[this.direction].y,
            duration: 200,
            onComplete: () => {
                this.body.enable = true
                setTimeout(() => {
                    this.hide()
                },  1500)
            }
        })
    }
}