function mouseDown(e) {
    lab.hud.poke(e.pageX, e.pageY)

    // TODO move to Land
    const ls = []
    const last = lab.hud.pick(e.pageX, e.pageY, ls)
    if ((e.buttons & 1) && !last) {
        if (_.land.orbital) {
            _.land.orbital.detach()
        }
    }
}
