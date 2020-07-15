function setup() {

    lab.spawn('hud/Hud', {
        name: 'hud'
    })

    lab.hud.spawn('hud/Map', {
        Z: 2,
        name: 'map',
        rx: .7,
        ry: 0,
        rw: .3,
        rb: 0.02,
    })

    lab.hud.spawn('hud/Land', {
        Z: 1,
        name: 'land',
        rx: 0,
        ry: 0,
        rw: .7,
        rh: 1,
        rb: 0,
    })

}
