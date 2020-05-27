import Heart from './components/Heart'
import CountDown from './components/CountDown'
import RestartButton from './components/RestartButton'
import Main from 'scene/Main'

export class LevelInterface extends Phaser.GameObjects.Container {
    scene : Main
    heart : number 
    counter : number
    countdown : CountDown
    restartButton : RestartButton
    heartComponents : Heart[] = []
    
    constructor(scene : Main , x : number, y : number, time : number) {
        super(scene, x, y)
        this.init(time)
    }

    init(time : number) : void {
        this.counter = time
        this.heart = 3
        this.initHeart()
        this.initCountDown()
        this.initRestartButton()
        this.scene.add.existing(this)
    }

    initRestartButton() : void {
        this.restartButton = new RestartButton(this.scene, 0, 0, this)
    }

    initCountDown() : void {
        this.countdown = new CountDown(this.scene, 0, this.heartComponents[0].height, this.counter)
        this.add(this.countdown)
    }

    initHeart() : void {
        for(let i = 0; i < this.heart; i += 1) {
            let heart = new Heart(this.scene, 0, 0, i)
            this.heartComponents.push(heart)
            this.add(heart)
        }
    }

    renderHeart() : void {
        this.heartComponents.forEach((heart : Heart, key : number) => {
            heart.setVisible(key + 1 <= this.heart)
        })
    }

    update() : void {
        this.renderHeart()
        this.countdown.update()
        if (this.countdown.counter === 0) {
           // window.alert("GameOver, temps ecouler")
            this.countdown.counter = 15
        }
    }
}