
import * as PIXI from 'pixi.js'

export default () => {

    const size = 5000

    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')
    canvas.width = size
    canvas.height = size

    const gradient = context.createRadialGradient(
        size / 2, size / 2, 0,
        size / 2, size / 2, size / 2
    )

    gradient.addColorStop(1, '#000000')
    gradient.addColorStop(0, '#333333')

    context.fillStyle = gradient
    context.fillRect(0, 0, canvas.width, canvas.height)

    let texture = PIXI.Texture.from(canvas)
    let sprite = new PIXI.Sprite(texture)
    sprite.width = size
    sprite.height = size
    sprite.position = new PIXI.Point(-size / 2, -size / 2)
    sprite.interactiveChildren = false

    s.pixi.addChild(sprite)

}