import * as PIXI from 'pixi.js'

export default () => {

    const stage = new PIXI.Graphics()
    stage.alpha = 0
    stage.name = 'keywords_close'
    stage.interactiveChildren = false
    s.pixi.addChild(stage)

    const lineHeight = 5
    const items = 3

    s.triplets.forEach(triplet => {

        const tokens = triplet.tokens.slice(0, items)
        const offsetY = lineHeight * tokens.length / 2
        const x = triplet.position[0]
        const y = triplet.position[1]

        tokens.forEach(([key, value], i) => {

            const text = new PIXI.BitmapText(
                key,
                {
                    fontName: 'Arial',
                    fontSize: '28',
                    tint: 0x666666,
                    align: 'center',
                })

            const scale = .16   
            text.scale.set(scale)
            text.position.set(x - text.width / 2, y - offsetY + lineHeight * i)
            stage.addChild(text)

        })

    })

}