import * as PIXI from 'pixi.js'

export default () => {
    
    const stage = new PIXI.Graphics()
    stage.interactiveChildren = false
    stage.alpha = .05
    s.pixi.addChild(stage)

    s.links.forEach(({ source, target, value }) => {

        stage.lineStyle(value, 0xFFFFFF)
        stage.moveTo(source.x, source.y)
        stage.lineTo(target.x, target.y)

    })

}