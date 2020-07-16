function mouseDown(e) {
    lab.hud.poke(e.pageX, e.pageY)

    const ls = []
    const last = lab.hud.pick(e.pageX, e.pageY, ls)

    if (env.touched && isFun(env.touched.release)) {
        env.touched.release()
    }
    env.touched = last
    if (last && isFun(last.select)) {
        last.select()
    }

    if ((e.buttons & 1) && !last) {
        log('try to kill the menu')
        if (_.land.orbital) {
            _.land.orbital.detach()
        }
    }
}
