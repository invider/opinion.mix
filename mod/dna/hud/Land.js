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
        this.selection = {
            active: false,
        }
        this.captured = []
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

    capture(node) {
        if (node.select) {
            node.select()
            if (this.captured.indexOf(node) < 0) {
                this.captured.push(node)
            }
        }
    }

    releaseAll() {
        this.captured.forEach(node => {
            node.release()
        })
        this.captured = []
    }

    applyArea(x1, y1, x2, y2, fn) {
        this._ls.forEach(n => {
            if (!n._sizable) return
            if (n.x >= x1 && n.x + n.w <= x2
                    && n.y >= y1 && n.y + n.h <= y2) {
                fn(n)
            }
        })
    }

    selectArea(x1, y1, x2, y2) {
        if (x1 > x2) {
            const x3 = x1
            x1 = x2
            x2 = x3
        }
        if (y1 > y2) {
            const y3 = y1
            y1 = y2
            y2 = y3
        }
        
        const land = this
        this.releaseAll()
        this.applyArea(x1, y1, x2, y2, (node) => {
            land.capture(node)
        })
    }

    dragSelection(dx, dy) {
        dx /= this.zoom
        dy /= this.zoom
        this.captured.forEach(node => {
            node.x += dx
            node.y += dy
        })
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

        if (this.selection.active) {
            lineWidth(2)
            stroke('#404040')
            const { x1, y1, x2, y2 } = this.selection
            const w = x2 - x1
            const h = y2 - y1
            rect(x1, y1, w, h)
        }

        restore()
    }

    onMouseDown(x, y, b, e) {
        super.onMouseDown(x, y, b, e)

        const ls = []
        const current = this.pick(this.gx(x), this.gy(y), ls)
        env.touched = current

        if (b & 1) {
            if (current) {
                log('picked ' + env.touched.name)
                this.releaseAll()
                this.capture(current)

            } else {
                this.releaseAll()

                this.selection.x1 = x
                this.selection.x2 = x
                this.selection.y1 = y
                this.selection.y2 = y
                this.selection.active = true
            }

        } else if (b & 2) {
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
                    text: 'some',
                    action: function() {
                        log('something')
                    },
                },
                {
                    text: 'another',
                    action: function() {
                        log('another')
                    },
                },
                {
                    text: 'git',
                    action: function() {
                        log('git split')
                    },
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
            ])
        }
    }

    onMouseDrag(dx, dy, e) {
        if (e.buttons & 1) {
            if (!e.ctrlKey && !e.altKey && this.selection.active) {
                this.selection.x2 += dx/this.zoom
                this.selection.y2 += dy/this.zoom
            }
        }
        if (this.__.captured.length === 1 &&
                    (((e.buttons & 1) && (e.ctrlKey || e.altKey))
                        || ((e.buttons & 4) && (!e.ctrlKey && !e.altKey)))) {
                // only land is captured
                this.dx -= dx/this.zoom
                this.dy -= dy/this.zoom
        }
    }

    onMouseUp(e) {
        if (this.selection.active) {
            this.selection.active = false
            const { x1, y1, x2, y2 } = this.selection
            this.selectArea(x1, y1, x2, y2)

            log('selected area: '
                + this.selection.x1 + ':' + this.selection.y1
                + ' :: ' + this.selection.x2 + ':' + this.selection.y2
            )
            log('width: ' + (this.selection.x2 - this.selection.x1))
            log('height: ' + (this.selection.y2 - this.selection.y1))
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
