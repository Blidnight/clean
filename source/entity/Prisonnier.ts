import Main from '../scene/Main'

export default class Prisonnier extends Phaser.GameObjects.Container {
    public direction: number = 1
    public animation: string = "fixe"
    public parts: any = {}
    public scene: Main
    public tween: any = {}
    public body: Phaser.Physics.Arcade.Body

    constructor(scene: Main, x: number, y: number) {
        super(scene, x, y)
        scene.add.existing(this)
        this.tween = {}
        this.initialize()
    }

    private initialize(): void {
        this.initializePart()
        this.playAnimation()
    }

    public setAnimation(animation: string): void {
        if (this.animation === animation) return
        this.animation = animation
        this.playAnimation()
    }

    private playAnimation(): void {
        let animationReference: HTMLElement = this.scene.cache.xml.get(`prisonnier_${this.animation}`)
        let list: HTMLElement[] = Array.from(animationReference.querySelectorAll('source Source'))
        let motions: HTMLElement[] = Array.from(animationReference.querySelectorAll("Motion"))

        motions.forEach((motion: HTMLElement) => {
            this.playPart(motion)
        })
    }

    public update() : void {
        if (this.body.velocity.x !== 0) {
            this.direction = this.body.velocity.x > 0 ? 1 : -1
        }
       
    }

    private playPart(motion: HTMLElement): void {
        let reference = motion.querySelector("source Source")
        let keyframes: HTMLElement[] = Array.from(motion.querySelectorAll("Keyframe"))
        let name: string = reference.getAttribute("symbolName")
        let dimension = reference.querySelector("dimensions").children[0]
        let transformation = reference.querySelector('transformationPoint').children[0]
        let scaleX = isNaN(parseFloat(reference.getAttribute("scaleX"))) ? 1 : parseFloat(reference.getAttribute("scaleX"))
        let scaleY = isNaN(parseFloat(reference.getAttribute("scaleY"))) ? 1 : parseFloat(reference.getAttribute("scaleY"))
        let rotation = isNaN(parseFloat(reference.getAttribute("rotation"))) ? 0 : parseFloat(reference.getAttribute("rotation"))
        let part: Phaser.GameObjects.Image = this.parts[name.split('/')[1]]
 console.log(parseFloat(reference.getAttribute("rotation")))
 console.log(transformation)
        part.y =  parseFloat(reference.getAttribute("y"))
        part.setScale(this.direction, 1)
        part.x = (part.scaleX * parseFloat(reference.getAttribute("x")))
        part.setOrigin(parseFloat(transformation.getAttribute("x")), parseFloat(transformation.getAttribute("y")))
        part.setAngle(part.scaleX * rotation)

        let framerate : number = this.animation === "fixe" ? 12 : 24
        let duration: number = 1000 / framerate * 4
        let count = 1
        let origin = [part.x, part.y, part.angle, part.scaleX, part.scaleY]
        let animation = this.animation

        part.setScale(scaleX, scaleY)

        console.log(origin)

        this.createPartTween({
            count, duration, origin, animation, part, keyframes, name, reference
        })
    }

    private playAnimationTween(target: Phaser.GameObjects.Image, count: number, origin: number[], duration: number, over: Function, keyframes: HTMLElement[], name: string, reference: HTMLElement, animation: string) {
        let x = parseFloat(keyframes[count].getAttribute("x"))
        let y = parseFloat(keyframes[count].getAttribute("y"))
        let scaleX = isNaN(parseFloat(keyframes[count].getAttribute("scaleX"))) ? 1 : parseFloat(keyframes[count].getAttribute("scaleX"))
        let scaleY = isNaN(parseFloat(keyframes[count].getAttribute("scaleY"))) ? 1 : parseFloat(keyframes[count].getAttribute("scaleY"))
        let skewX = isNaN(parseFloat(keyframes[count].getAttribute("skewX"))) ? 1 : parseFloat(keyframes[count].getAttribute("skewX"))
        let skewY = isNaN(parseFloat(keyframes[count].getAttribute("skewY"))) ? 1 : parseFloat(keyframes[count].getAttribute("skewY"))
        let sourceX = parseFloat(reference.getAttribute("x"))
        if (target.scaleX !== this.direction) {
            target.setScale(this.direction, 1)
            origin[0] = (target.scaleX * parseFloat(reference.getAttribute("x")))
            origin[2] = target.scaleX * parseFloat(reference.getAttribute("rotation"))
            isNaN(origin[2]) ? origin[2] = 0 : null
        }
     

        let angle = origin[2] + target.scaleX * parseFloat(keyframes[count].getAttribute("rotation"))
        isNaN(angle) ? angle = 0 : null
        

        this.tween[name] = this.scene.tweens.add({
            targets: target,
            x: (origin[0] + (isNaN(x) ? 0 : (target.scaleX * x))),
            y: origin[1] + (isNaN(y) ? 0 : y),
            angle: angle,
            duration: duration,
            onComplete: () => {
                if (this.animation !== animation) {
                    return
                }
                if (count < keyframes.length - 1) this.playAnimationTween(target, count + 1, origin, duration, over, keyframes, name, reference, animation)
                else {

                    this.playAnimationTween(target, 1, origin, duration, over, keyframes, name, reference, animation)
                }
            }
        })

        if (count === 1) {
            console.log(target)
            return
        }

    }

    private createPartTween(data: any): void {
        this.playAnimationTween(data.part, data.count, data.origin, data.duration, this.createPartTween, data.keyframes, data.name, data.reference, data.animation)
    }

    private initializePart(): void {
        let parts = ["bras1", "bras2", "jambe1", "jambe2", "corps", "tete", "tete-verso", "corps-verso"]
    
        parts.forEach((part: string) => {
            this.parts[part] = new Phaser.GameObjects.Image(this.scene, this.x, this.y, `elements/${part}`)
            this.scene.add.existing(this.parts[part])

            this.add(this.parts[part])
        })
        
    }
}