

const df = {
    x: 0,
    y: 0,
    w: 100,
    h: 100,
}

let id = 0
class Napkin {

    constructor(st) {
        augment(this, df)
        augment(this, st)
        if (!this.name) this.name = 'napkin' + (++id)
    }

    draw() {
        fill('#808020')
        rect(this.x, this.y, this.w, this.h)
        if (this.caption) {
            fill('#202020')
            font('32px moon')
            baseTop()
            alignLeft()
            text(this.caption, this.x+10, this.y+10)
        }
    }

    onMouseDrag(dx, dy) {
        this.x += dx
        this.y += dy
    }
}
