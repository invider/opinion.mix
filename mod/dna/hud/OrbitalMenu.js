
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

    populate() {
        let name = 'empty'
        if (this.target) name = this.target.name

        this.spawn('hud/gadget/Button', {
            x: 100, y: 0,
            w: 50, h: 20,
            text: name,
            onClick: function() {
                log('selected ' + this.text)
                this.__.kill()
            }
        })
        this.spawn('hud/gadget/Button', {
            x: 85, y: 50,
            w: 50, h: 20,
            text: 'inject',
            onClick: function() {
                log('injected new')
                if (!this.target) {
                    _.land.spawn('pin/Napkin', {
                        x: this.__.x,
                        y: this.__.y,
                        w: 200,
                        h: 100,
                    })
                }
                this.__.kill()
            }
        })
        this.spawn('hud/gadget/Button', {
            x: 40, y: 90,
            w: 50, h: 20,
            text: 'reject',
            onClick: function() {
                log('rejected')
                if (this.__.target) {
                    this.__.target.__.detach(this.__.target)
                }
                this.__.kill()
            }
        })
    }

    drawBackground() {
        stroke('#303035')
        lineWidth(2)
        circle(0, 0, 100)
    }

    kill() {
        this.__.detach(this)
    }
}
