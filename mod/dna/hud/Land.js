const df = {
    x: 0,
    y: 0,
    w: 100,
    h: 100,
}

class Land {

    constructor(st) {
        augment(this, df)
        augment(this, st)
    }

    adjust() {
        const b = rx(this.rb)
        this.x = rx(this.rx) + b
        this.y = ry(this.ry) + b
        this.w = rx(this.rw) - 2*b
        this.h = ry(this.rh) - 2*b
    }

    draw() {
        save()
        translate(this.x, this.y)

        fill('#101012')
        rect(0, 0, this.w, this.h)

        stroke('#404040')
        lineWidth(3)
        rect(0, 0, this.w, this.h)

        restore()
    }
}
