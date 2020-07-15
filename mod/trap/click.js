function click(e) {
    log(e.pageX)
    log(e.pageY)

    const ls = []
    lab.hud.poke(e.pageX, e.pageY)
    //lab.hud.pick(e.pageX, e.pageY, ls)
    //console.dir(ls)
}
