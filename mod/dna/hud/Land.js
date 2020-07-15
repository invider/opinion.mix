const df = {
    dx: 0,
    dy: 0,
    zoom: 1,
}

class Land extends dna.hud.Container {

    constructor(st) {
        super(st)
        augment(this, df)
    }

    adjust() {
        const b = rx(this.rb)
        this.x = rx(this.rx) + b
        this.y = ry(this.ry) + b
        this.w = rx(this.rw) - 2*b
        this.h = ry(this.rh) - 2*b
    }

    drawBackground() {
        fill('#101012')
        rect(0, 0, this.w, this.h)

        stroke('#404040')
        lineWidth(3)
        rect(0, 0, this.w, this.h)
    }

    draw() {
        if (this.hidden) return
        save()
        translate(this.x + this.dx, this.y + this.dy)

        if (this.clip) {
            ctx.beginPath()
            ctx.rect(0,0,this.w,this.h)
            ctx.clip()
        }

        this.drawBackground()
        this.drawContent()
        this.drawForeground()

        restore()
    }

    onMouseDrag(dx, dy) {
        log('delta: ' + dx + 'x' + dy)

        if (this.__.captured.length === 1) {
            // only land is captured
            this.dx += dx
            this.dy += dy
        }
    }
}
