import * as PIXI from 'pixi.js'

let stage, max
let index = []

export default () => {

    const tokens = new PIXI.Graphics()
    tokens.interactiveChildren = false
    stage = s.pixi.addChild(tokens)
    stage.name = 'keywords_distant'

    s.triplets.forEach(triplet => {

        const token = triplet.tokens.slice(0, 1)
        const x = triplet.position[0]
        const y = triplet.position[1]

        const text = new PIXI.BitmapText(
            token[0][0],
            {
                fontName: 'Arial',
                fontSize: '64',
                fill: 0xFEDD00,
                align: 'center',
            })

        const value = token[0][1]
        const base = 20
        const magnitude = .007
        text.scale.set((value + base) * magnitude)

        text.position.set(x - text.width / 2, y - text.height / 2)

        // Check overlapping

        let overlapping = false

        for (var i = 0; i < index.length; i++) {

            const l1 = index[i]
            const l2 = text

            if (!(l2.x > l1.x + l1.width
                || l2.x + l2.width < l1.x
                || l2.y > l1.y + l1.height
                || l2.y + l2.height < l1.y)) {
                overlapping = true
                break
            }

        }

        if (!overlapping) {
            stage.addChild(text)
            index.push(text)

            // draw a rounded rectangle
            // const graphics = new PIXI.Graphics();
            // graphics.lineStyle(2, 0xFF00FF, 1)
            // graphics.beginFill(0x650A5A, 0.25)
            // graphics.drawRoundedRect(link.txt.x, link.txt.y, link.txt.width, link.txt.height, 5)
            // graphics.endFill()
            // stage.addChild(graphics)
        }

    })

}
