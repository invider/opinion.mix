function setup() {

    lab.spawn('hud/Hud', {
        Z: 1,
        name: 'hud',
    })

    const land = lab.hud.spawn('hud/Land', {
        Z: 1,
        name: 'land',
        rx: 0,
        ry: 0,
        rw: .7,
        rh: 1,
        rb: 0,
    })
    _.link(land)

    const map = lab.spawn('hud/Map', {
        Z: 2,
        name: 'map',
        rx: .7,
        ry: 0,
        rw: .3,
        rb: 0.02,
    })
    map.adjust()

    // populate land
    _.land.spawn('pin/Napkin', {
        x: 0,
        y: 0,
        w: 200,
        h: 100,
        caption: 'Napkin 0x0',
    })

    _.land.spawn('pin/Napkin', {
        x: 400,
        y: 400,
        w: 200,
        h: 100,
        caption: 'Napkin 4x4',
    })

}
