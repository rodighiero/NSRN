import { BitmapText, Graphics } from 'pixi.js'

export default () => {

    const stage = new Graphics()
    stage.alpha = 0
    stage.name = 'keywords_close'
    stage.interactiveChildren = false
    s.viewport.addChild(stage)

    const lineHeight = 5
    const items = 3

    s.triplets.forEach(triplet => {

        const tokens = triplet.tokens.slice(0, items)
        const offsetY = lineHeight * (tokens.length - 1) / 2
        const x = triplet.position[0]
        const y = triplet.position[1]

        tokens.forEach(([key, value], i) => {

            const text = new BitmapText(
                key,
                {
                    fontName: 'Lato',
                    fontSize: '4',
                    tint: 0x666666,
                    align: 'center',
                })

            text.position.set(x - text.width / 2, y - offsetY + lineHeight * i)
            stage.addChild(text)

        })

    })

}