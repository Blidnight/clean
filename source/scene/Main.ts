import Prisonnier from '../entity/Prisonnier'
import Piege from '../entity/Piege'
import config from '../main'

export default class Main extends Phaser.Scene {
    public prisonner: Phaser.Physics.Arcade.Group
    public echelle: Phaser.Physics.Arcade.StaticGroup
    public plateforme: Phaser.Physics.Arcade.StaticGroup

    constructor() {
        super("main")
    }

    preload(): void {
        this.load.xml("prisonnier_marche", "prisonnier_marche.xml")
        this.load.xml("prisonnier_course", "prisonnier_course.xml")
        this.load.svg("elements/tete", "tete.svg", { scale: 1 })
        this.load.svg("elements/corps", "corps.svg", { scale: 1 })
        this.load.svg("elements/jambe1", "jambe1.svg", { scale: 1 })
        this.load.svg("elements/jambe2", "jambe2.svg", { scale: 1 })
        this.load.svg("elements/bras1", "bras1.svg", { scale: 1 })
        this.load.svg("elements/bras2", "bras2.svg", { scale: 1 })
        this.load.setPath("map/")
        this.load.svg("fond-mur", "fond-mur.svg", {scale : 1})
        this.load.svg("contour-scene", "contour-scene.svg", {scale : 1})
        this.load.svg("murs-n1", "murs-n1.svg", {scale : 1})
        this.load.svg("contour-n1", "contour-n1.svg", {scale : 1})
        this.loadSvg("sol-echelle-gauche")
        this.loadSvg("sol-echelle-droite")
        this.loadSvg("lumiere-plafond-on")
        this.loadSvg("lumiere-plafond-off")
        this.loadSvg("cellule-marches")
        this.loadSvg("cellule-fermer")
        this.loadSvg("sortie-fermer")
        this.loadSvg("panneau-sortie")
        this.loadSvg("echelle")
        this.loadSvg("ombre-n1-etage1")
        this.loadSvg("ombre-n1-etage2")
        this.loadSvg("lumiere")
        this.loadSvg("pique-sol")
        this.loadSvg("pique-haut")
       
        
    }

    loadSvg(name : string) : void {
        this.load.svg(`${name}`, `${name}.svg`, {scale : 1})
    }

    create(): void {
        this.add.image(0, 0, "fond-mur").setOrigin(0)
        this.add.image(0, 0, "contour-scene").setOrigin(0)
        this.add.image(52, 122, "murs-n1").setOrigin(0)
        this.add.image(46.029, 117.352, "contour-n1").setOrigin(0)
        this.add.image(52, 252, "sol-echelle-gauche").setOrigin(0)
        this.add.image(676, 408, "sol-echelle-droite").setOrigin(0)
        this.add.image(227, 434, "lumiere-plafond-on").setOrigin(0)
        this.add.image(559, 434, "lumiere-plafond-on").setOrigin(0)
        this.add.image(227, 278, "lumiere-plafond-on").setOrigin(0)
        this.add.image(559, 278, "lumiere-plafond-on").setOrigin(0)
        this.add.image(227, 122, "lumiere-plafond-on").setOrigin(0)
        this.add.image(559, 122, "lumiere-plafond-on").setOrigin(0)
        this.add.image(84, 470, "cellule-fermer").setOrigin(0)
        this.add.image(75, 540, "cellule-marches").setOrigin(0)
        this.add.image(672, 180, "sortie-fermer").setOrigin(0)
        this.add.image(635, 206, "panneau-sortie").setOrigin(0)

        // Echelle droite
        this.add.image(690, 391, "echelle").setOrigin(0)
        this.add.image(66, 235, "echelle").setOrigin(0)

        // Ombres
        this.add.image(52, 434, "ombre-n1-etage1").setOrigin(0).setDepth(2)
        this.add.image(52, 278, "ombre-n1-etage2").setOrigin(0).setDepth(2)

        // Lumiere
        this.add.image(440, 434, "lumiere").setOrigin(0).setDepth(4)
        this.add.image(107, 278, "lumiere").setOrigin(0).setDepth(4)
        this.add.image(107, 122, "lumiere").setOrigin(0).setDepth(4)
        this.add.image(440, 122, "lumiere").setOrigin(0).setDepth(4)
        
        this.physics.world.setBounds(50, 120, 705, 445, true, true, true, true)

        let prisonnier = this.physics.add.group()
        let plateforme = this.physics.add.staticGroup()
        let echelle = this.physics.add.staticGroup()
        let piege = this.physics.add.staticGroup()

        prisonnier.runChildUpdate = true
        piege.runChildUpdate = true

        this.physics.add.collider(prisonnier, plateforme)
        this.physics.add.collider(prisonnier, piege, (prisonnier : any, piege : any) => {
            prisonnier.x = 120
            prisonnier.y = 550
            prisonnier.direction = 1
            prisonnier.setAnimation("marche")
            prisonnier.body.setVelocityX(0)
        })
        this.physics.add.collider(echelle, prisonnier, (echelleI: any, prisonnierI: any) => {
            prisonnierI.body.setEnable(false)
            this.tweens.add({
                targets: prisonnierI,
                y: echelleI.y,
                duration: 1000,
                onComplete: () => {
                    prisonnierI.body.setEnable(true)
                    prisonnierI.body.setVelocityX(prisonnierI.body.velocity.x === 0 ? - prisonnierI.direction * 150 : 0)
                }
            })
        })

        plateforme.add(this.add.rectangle(50, 565, 708, 20).setOrigin(0))
        plateforme.add(this.add.rectangle(50, 410, 708, 20).setOrigin(0))
        plateforme.add(this.add.rectangle(50, 251, 708, 20).setOrigin(0))

        echelle.add(this.add.rectangle(66 , 235, 10, 160).setOrigin(0))
        echelle.add(this.add.rectangle(690 + 40, 391, 10, 160).setOrigin(0))

        let ab = new Prisonnier(this, 120, 550)

        prisonnier.add(ab)

        let body = ab.body as Phaser.Physics.Arcade.Body
        body.setCollideWorldBounds(true)
        body.setSize(body.width / 2, body.height)
        body.setOffset(-body.width / 2, -body.height)
        body.setVelocityX(150)


        this.input.on('pointerdown', () => {
            let velocity = body.velocity.x === 0 ? ab.direction * 150 : 0
            setTimeout(() => { body.setVelocityX(velocity) }, 100)

            if (velocity === 0) {
                ab.setAnimation("marche")
            } else {
                ab.setAnimation("course")
            }
        })

        new Piege(this, 220, 388.4, "pique-sol", piege, 0)
        new Piege(this, 243, 388.4, "pique-sol", piege, 0)
        new Piege(this, 455, 388.4, "pique-sol", piege, 0)
        new Piege(this, 233, 232.4, "pique-sol", piege, 0)
        new Piege(this, 367, 232.4, "pique-sol", piege, 0)
        new Piege(this, 390, 232.4, "pique-sol", piege, 0)
        new Piege(this, 524, 232.4, "pique-sol", piege, 0)
        new Piege(this, 547, 232.4, "pique-sol", piege, 0)

        new Piege(this, 281, 122, "pique-haut", piege, 1)
        new Piege(this, 424, 122, "pique-haut", piege, 1)
        new Piege(this, 583, 122, "pique-haut", piege, 1)
        new Piege(this, 607, 122, "pique-haut", piege, 1)

        new Piege(this, 48, 518, "pique-sol", piege, 3)
        new Piege(this, 48, 498, "pique-sol", piege, 3)
        new Piege(this, 758 - 20, 187, "pique-sol", piege, 2)
        new Piege(this, 758 - 20, 167, "pique-sol", piege, 2)
    }

    update(): void {

    }
}