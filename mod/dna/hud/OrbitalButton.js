class OrbitalButton extends dna.hud.gadget.Button {

    constructor(st) {
        super(st)
    }

    drawBackground() {
        stroke('#606060')
        rect(this.x, this.y, this.w, this.h)
    }
}
