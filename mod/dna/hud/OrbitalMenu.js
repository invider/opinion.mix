
class OrbitalMenu extends dna.hud.Container {

    constructor(st) {
        super(st)
        this.clip = false
    }

    lx(x) {
        return x - this.x
    }

    ly(y) {
        return y - this.y
    }

    populate(actions) {
        let name = 'empty'
        if (this.target) name = this.target.name

        // clean up existing actions
        this.detachAll()

        // fill actions
        let x = 50
        let y = -50
        let shift = 5
        let theta = TAU - .2

        const R = this.r
        actions.forEach(a => {
            //const x = R * cos(theta) - R*0.5
            //const y = R * sin(theta) - R*0.2
            this.spawn('hud/OrbitalButton', {
                x: x, y: y,
                w: 50, h: 20,
                text: a.text,
                onClick: a.action,
            })
            y += 40
            x -= shift
            shift += 15
            //theta += .35
        })
    }

    drawBackground() {
        //stroke('#303035')
        //lineWidth(2)
        //circle(0, 0, this.r)
    }

    kill() {
        this.__.detach(this)
    }
}
