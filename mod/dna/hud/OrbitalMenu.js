
class OrbitalMenu extends dna.hud.Container {

    constructor(st) {
        super(st)
        this.clip = false
    }

    populate() {
        this.spawn('hud/gadget/Button', {
            x: 100, y: 0,
            w: 50, h: 20,
            text: 'select',
        })
        this.spawn('hud/gadget/Button', {
            x: 85, y: 50,
            w: 50, h: 20,
            text: 'inject',
        })
        this.spawn('hud/gadget/Button', {
            x: 40, y: 90,
            w: 50, h: 20,
            text: 'reject',
        })
    }

    drawBackground() {
        stroke('#303035')
        lineWidth(2)
        circle(0, 0, 100)
    }

}
