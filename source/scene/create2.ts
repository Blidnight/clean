// import Prisonnier from '../entity/Prisonnier'
// import Piege from '../entity/Piege'
// import config from '../main'

// export default class Main extends Phaser.Scene {
//     public prisonner: Phaser.Physics.Arcade.Group
//     public echelle: Phaser.Physics.Arcade.StaticGroup
//     public plateforme: Phaser.Physics.Arcade.StaticGroup

//     constructor() {
//         super("main")
//     }

//     preload(): void {
//         this.load.xml("prisonnier_marche", "prisonnier_marche.xml")
//         this.load.xml("prisonnier_course", "prisonnier_course.xml")
//         this.load.xml("prisonnier_fixe", "prisonnier_fixe.xml")
//         this.load.xml("prisonnier_monte-echelle", "prisonnier_monte-echelle2.xml")

//         this.load.svg("elements/tete", "tete.svg", { scale: 1 })
//         this.load.svg("elements/tete-verso", "tete-verso.svg", { scale: 1 })
//         this.load.svg("elements/corps", "corps.svg", { scale: 1 })
//         this.load.svg("elements/corps-verso", "corps-verso.svg", { scale: 1 })
//         this.load.svg("elements/jambe1", "jambe1.svg", { scale: 1 })
//         this.load.svg("elements/jambe2", "jambe2.svg", { scale: 1 })
//         this.load.svg("elements/bras1", "bras1.svg", { scale: 1 })
//         this.load.svg("elements/bras2", "bras2.svg", { scale: 1 })

//         this.load.setPath("map/")
//         this.loadSvg("fond-mur")
//         this.loadSvg("contour-scene")
//         this.loadSvg("murs-n1")
//         this.loadSvg("contour-n1")
//         this.loadSvg("sol-echelle-gauche")
//         this.loadSvg("sol-echelle-droite")
//         this.loadSvg("lumiere-plafond-on")
//         this.loadSvg("lumiere-plafond-off")
//         this.loadSvg("cellule-marches")
//         this.loadSvg("cellule-fermer")
//         this.loadSvg("sortie-fermer")
//         this.loadSvg("panneau-sortie")
//         this.loadSvg("echelle")
//         this.loadSvg("ombre-n1-etage1")
//         this.loadSvg("ombre-n1-etage2")
//         this.loadSvg("lumiere")
//         this.loadSvg("pique-sol")
//         this.loadSvg("pique-haut")
//         this.loadSvg("mur-couloirs")
//     }

//     loadSvg(name: string): void {
//         this.load.svg(`${name}`, `${name}.svg`, { scale: 1 })
//     }

//     create(): void {
//         let tiles = this.add.graphics()
//         tiles.x = 52
//         tiles.y = 80
//         let mask = new Phaser.Display.Masks.GeometryMask(this, tiles)

//         this.add.image(0, 0, "fond-mur").setOrigin(0)
//         let couloir = this.add.image(0, 0, "mur-couloirs").setOrigin(0)
//         couloir.setMask(mask)

//         //this.add.grid(52, 122, 32 * 22, 22 * 7, 22, 22, 0xFF, 0, 0xFF, 1).setOrigin(0, 0)

//         // let grid = [
//         //     "00000002050000055000000520000000",
//         //     "00000000000000000000000000000000",
//         //     "00000000000000000000000000000000",
//         //     "00000000000000000000000000000000",
//         //     "00000000000000000000000000000000",
//         //     "10000000044000400000444000000000",
//         //     "0000xxxxxxxxxxxxxxxxxxxxxxxxxxxx",
//         //     "00000002000000000000000030000000",
//         //     "00000000000000000000000000000000",
//         //     "00000000000000000000000000000000",
//         //     "00000000000000000000000000000000",
//         //     "00000000000000000000000000000000",
//         //     "00000004400000000400000000001000",
//         //     "xxxxxxxxxxxxxxxxxxxxxxxxxxxx0000",
//         //     "00000003000000000000000020000000",
//         //     "00000000000000000000000000000000",
//         //     "00000000000000000000000000000000",
//         //     "00000000000000000000000000000000",
//         //     "00000000000000000000000000000000",
//         //     "00000000000000000000000000000000",
//         // ]

//         let grid = [
//             "00000000000000000000000000000000",
//             "00000000000000000000000000000000",
//             "000000000000000000000000xxx00000",
//             "00000000000000000000000000000000",
//             "00000xxx000000000000000000000000",
//             "00000000000000000000000000000000",
//             "00000000000000000000000000000000",
//             "0000000000000xxxxx00000000000000",
//             "00000000000000000000000000000000",
//             "00000000000000000000000000000000",
//             "00000000000000000000000000000000",
//             "00000000xxx00000000000000000xxx0",
//             "00000000000000000000000000000000",
//             "00000000000000000000000000000000",
//             "00000000000000000000000000000000",
//             "xxx00000000000000xx0000000000000",
//             "00000000000000000000000000000000",
//             "00000000000000000000000000000000",
//             "000000000000000000000000000000xx",
//             "0000000xxx0000000000000000000000",
//             "00000000000000000000xxx000000000",
//             "00000000000000000000000000000000",
//             "00000000000000000000000000000000",
//         ]
//         let piege = this.physics.add.staticGroup()
//         grid.forEach((row: string, y: number) => {
//             let column = row.split("")
//             column.forEach((tile: string, x: number) => {
//                 if (tile !== 'x') {
//                     tiles.fillRect(x * 22, y * 22, 22, 22)
//                     if (tile === '1') this.add.image(x * 22 + 72, y * 22 + 122, "echelle").setOrigin(0)
//                     if (tile === '2') {
//                         this.add.image(x * 22 + 52, y * 22 + 122, "lumiere-plafond-on").setOrigin(0)
//                         this.add.image (x * 22 + 52 + 11, y * 22 + 122, "lumiere").setOrigin(0.5, 0)
//                     }
//                     if (tile === '3') this.add.image(x * 22 + 52, y * 22 + 122, "lumiere-plafond-off").setOrigin(0)
//                     if (tile === '4') {
//                         new Piege(this, x * 22 + 52, y * 22 + 124, "pique-sol", piege, 0)
//                     } else if (tile === '5') {
//                         new Piege(this, x * 22 + 52, y * 22 + 122, "pique-haut", piege, 1)
//                     }
//                 }
//             })
//         })

//         this.add.image(360, 162, "sortie-fermer").setOrigin(0)
//         this.add.image(360, (grid.length - 3) * 22 + 76, "cellule-fermer").setOrigin(0)
      
      
//     }



//     update(): void {

//     }
// }

// generateYVectors(grid: any): any[] {
//     let vectors = []
//     for (let x = 0; x < grid.width; x += 1) {
//         let position = { x: x * grid.cellWidth, y: 0 }
//         let angle = Phaser.Math.Angle.BetweenPoints(position, grid.PF)
//         vectors.push({ x: Math.cos(angle), y: Math.sin(angle) })
//     }
//     return vectors
// }

// vectorProduct(a: any, b: any) {
//     return { x: Math.floor(a * b.x), y: Math.floor(a * b.y) }
// }

// vectorSum(a: any, b: any) {
//     return { x: Math.floor(a.x + b.x), y: Math.floor(a.y + b.y) }
// }

// getPointsfromUnitVector(unitVector: any, point: any) {
//     let xi = this.vectorProduct(point.x, unitVector.i)
//     let yj = this.vectorProduct(point.y, unitVector.j)
//     return this.vectorSum(xi, yj)

// }

// getPoint(point: any, vectors: any) {
//     let x = point.x / 20
//     let vector = vectors[x]
//     return this.getPointsfromUnitVector({ i: { x: 1, y: 0 }, j: vectors[x] }, point)
// }

// avatar: any