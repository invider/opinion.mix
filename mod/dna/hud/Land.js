const df = {
    dx: 0,
    dy: 0,
    zoom: 1,
    wheelFeedback: 100,
    scrollFactor: 0.1,
}

class Land extends dna.hud.Container {

    constructor(st) {
        super(st)
        supplement(this, df)
    }

    adjust() {
        const b = rx(this.rb)
        this.x = rx(this.rx) + b
        this.y = ry(this.ry) + b
        this.w = rx(this.rw) - 2*b
        this.h = ry(this.rh) - 2*b
    }

    gx(x) {
        return (x - this.dx)*this.zoom + this.x + this.w/2
    }

    gy(y) {
        return (y - this.dy)*this.zoom + this.y + this.h/2
    }

    gxy(x, y) {
        return {
            x: (x - this.dx)*this.zoom + this.x + this.w/2,
            y: (y - this.dy)*this.zoom + this.y + this.h/2,
        }
    }

    lx(x) {
        return (x - this.x - this.w/2)/this.zoom + this.dx
    }

    ly(y) {
        return (y - this.y - this.h/2)/this.zoom + this.dy
    }

    lxy(x, y) {
        return {
            x: (x - this.x - this.w/2)/this.zoom + this.dx,
            y: (y - this.y - this.h/2)/this.zoom + this.dy,
        }
    }

    inView(x, y) {
        let gx = this.gx(x)
        let gy = this.gy(y)
        return (gx >= this.x
            && gx <= this.x + this.w
            && gy >= this.y
            && gy <= this.y + this.h)
    }

    cross(x, y, w) {
        line(x-w, y, x+w, y)
        line(x, y-w, x, y+w)
    }

    drawBackground() {
        //fill('#101012')
        //rect(0, 0, this.w, this.h)

        stroke('#404040')
        lineWidth(2)
        this.cross(0, 0, 100)

        stroke('#954040')
        this.cross(200, 200, 50)
    }

    draw() {
        if (this.hidden) return

        if (this.clip) {
            ctx.beginPath()
            ctx.rect(0,0,this.w,this.h)
            ctx.clip()
        }
        fill('#151820')
        rect(0, 0, this.w, this.h)

        save()

        translate(this.x + this.w/2, this.y + this.h/2)
        scale(this.zoom, this.zoom)
        translate(-this.dx, -this.dy)

        this.drawBackground()
        this.drawContent()
        this.drawForeground()

        restore()
    }

    onMouseDown(x, y, b, e) {
        super.onMouseDown(x, y, b, e)

        if (b & 2) {
            if (env.touched) {
                log('picked ' + env.touched.name)
            }

            const menu = _.land.spawn('hud/OrbitalMenu', {
                name: 'orbital',
                target: env.touched,
                x: x,
                y: y,
                r: 120,
            })

            menu.populate([
                {
                    text: 'new',
                    action: function() {
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
                },
                {
                    text: 'reject',
                    action: function() {
                        log('rejected')
                        if (this.__.target) {
                            this.__.target.__.detach(this.__.target)
                        }
                        this.__.kill()
                    }
                },
                {
                    text: 'some',
                    action: function() {
                        log(this._.name)
                    },
                },
                {
                    text: 'another',
                    action: function() {
                        log(this._.name)
                    },
                },
                {
                    text: 'git',
                    action: function() {
                        log(this._.name)
                    },
                },
            ])
        }
    }

    onMouseDrag(dx, dy, e) {
        if ((e.buttons & 1) && this.__.captured.length === 1) {
            // only land is captured
            this.dx -= dx/this.zoom
            this.dy -= dy/this.zoom
        }
    }

    onMouseWheel(d, x, y, e) {
        //super.onMouseWheel(d, x, y, e)
        const times = floor(abs(d)/ this.wheelFeedback)
        const unit = 0.05 * times
        let rate = d < 0? 1-unit : 1+unit
        this.zoom *= rate
    }
}
