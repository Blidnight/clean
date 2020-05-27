import "./css/Dialog.css"

const DialogContent = {
    "DialogStart": `
        <div class="dialog-content">
            <div class="dialog-avatar">
                <div class="dialog-avatar-container"><img src="prisonnier.svg"/></div>
            </div>
            <div class="dialog-text">
                <p> <b class="title"> Prisonnier </b> </p>
                <p> 
                    Okay, j’ai cassé les barreaux, on peut s’échapper maintenant.<br/><br/>

                    Clique sur la <b>touche [A]</b> de ton clavier pour me faire <b>avancer / m’arrêter</b>.<br/><br/>
                
                    Evitons les pièges pour ne pas que je perde de <b>vie</b> et faisons attention au <b>chrono</b> ! Si je dépasse, ils m’attraperont.<br/><br/>
                
                    <b>Le but :</b> rejoindre la porte.
                </p>
            </div>
        </div>
        <div class="dialog-actions">
            <div class="dialog-action-button" id="button-start-level">"GO GO GO"<div>
        </div>
    `,
    "DialogRejouer": `
        <div class="dialog-top">
            <div class="dialog-score-data">
                <div class="current-score">
                    <h3> Score Actuel </h3>
                    <h2> <b class="title">8</b></h2>
                </div>
                <div class="best-score">
                    <h3> Meilleur Score </h3>
                    <h2> <b class="title">8</b> </h2>
                </div>
            </div>
        </div>
        <div class="dialog-content">
            <div class="dialog-avatar">
                <div class="dialog-avatar-container"><img src="prisonnier.svg"/></div>
            </div>
            <div class="dialog-text">
                <p> <b class="title"> Prisonnier </b> </p>
                <p> 
                    NON, pas maintenant ! Je ne peux plus avancer, je n'ai plus de force...<br/><br/>

                    Mais on peut y arriver, retentons !!!
                </p>
            </div>
        </div>
        <div class="dialog-actions">
            <div class="dialog-action-button" id="button-start-level">Retour à la carte"</div>
            <div class="dialog-action-button" id="button-start-level">Rejouer le niveau</div>
            <div class="dialog-action-button" id="button-start-level">Niveau Suivant</div>
        
        </div>
    `
}

class Dialog {
    scene: Phaser.Scene
    parent: HTMLElement
    constructor(scene: Phaser.Scene) {
        this.scene = scene
        this.parent = document.querySelector('.dialog-container') as HTMLElement
        this.init()
    }

    protected init(): void {

    }
}

export class DialogRejouer extends Dialog {
    scene: Phaser.Scene
    content: string
    element: HTMLElement
    parent: HTMLElement

    protected init(): void {
        this.scene.scene.pause()
        this.element = document.createElement('div')
        this.element.className = "dialog"
        this.element.innerHTML = DialogContent.DialogRejouer
        this.registerEvents()
        this.parent.appendChild(this.element)
    }

    private registerEvents(): void {
        
    }
}

export class DialogStart extends Dialog {
    scene: Phaser.Scene
    content: string
    element: HTMLElement
    parent: HTMLElement

    protected init(): void {
        this.scene.scene.pause()
        this.element = document.createElement('div')
        this.element.className = "dialog"
        this.element.innerHTML = DialogContent.DialogStart
        this.registerEvents()
        this.parent.appendChild(this.element)
    }

    private registerEvents(): void {
        let action = {
            start: this.element.querySelector("div#button-start-level") as HTMLElement
        }

        action.start.onclick = (e) => {
            e.preventDefault()
            this.parent.style.display = "none"
            this.scene.scene.resume()
        }
    }
}