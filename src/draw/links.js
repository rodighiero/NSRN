import { Graphics } from 'pixi.js'

export default () => {

    const stage = new Graphics()
    stage.interactiveChildren = false
    stage.alpha = .05
    s.viewport.addChild(stage)

    s.links.filter(l => l.value > .2)
        .forEach(({ source, target, value }) => {

            stage.lineStyle(value, 0xFFFFFF)
            stage.moveTo(source.x, source.y)
            stage.lineTo(target.x, target.y)

        })

}