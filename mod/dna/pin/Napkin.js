

const df = {
    x: 0,
    y: 0,
    w: 100,
    h: 100,
    _centered: false,
}

let id = 0
class Napkin {

    constructor(st) {
        augment(this, df)
        augment(this, st)
        if (!this.name) this.name = 'napkin' + (++id)
        if (!this.caption) this.caption = this.name
    }

    select() {
        this.selected = true
    }

    release() {
        this.selected = false
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

        if (this.selected) {
            stroke('orange')
            lineWidth(3)
            rect(this.x, this.y, this.w, this.h)
        }
    }
    
    onClick(x, y, b, e) {
        //log('napkin mouse click @' + x + ':' + y)
    }

    onMouseDown(x, y, b, e) {
        //log('napkin mouse down @' + x + ':' + y)
    }

    onMouseDrag(dx, dy, e) {
        if (e.buttons & 1) {
            this.x += dx / this.__.zoom
            this.y += dy / this.__.zoom
        }
    }

    onFocus() {
        //log('focused')
    }

    poke(x, y) {
        //log('pock: ' + floor(x) + 'x' + floor(y))
        if (x >= this.x && x <= this.x + this.w
                && y >= this.y && y <= this.y + this.h) {
            //log('poked ' + this.name)
        }
    }

    pick(x, y, ls) {
        if (x >= this.x && x <= this.x + this.w
                && y >= this.y && y <= this.y + this.h) {
            ls.push(this)
            return this
        }
    }

    within(x, y) {
        return (x >= this.x && x <= this.x + this.w
            && y >= this.y && y <= this.y + this.h)
    }
}
