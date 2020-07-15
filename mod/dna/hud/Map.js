const df = {
    x: 0,
    y: 0,
    w: 100,
    h: 100,
}

class Map {

    constructor(st) {
        augment(this, df)
        augment(this, st)
    }

    adjust() {
        const b = rx(this.rb)
        this.x = rx(this.rx) + b
        this.y = ry(this.ry) + b
        this.w = rx(this.rw) - 2*b
        this.h = this.w
    }

    draw() {
        save()
        translate(this.x, this.y)

        fill('#202024')
        rect(0, 0, this.w, this.h)

        stroke('orange')
        lineWidth(2)
        rect(0, 0, this.w, this.h)

        restore()
    }
}
