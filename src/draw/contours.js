import { Graphics } from 'pixi.js'
import { contourDensity, extent } from 'd3'

const color = 0x608bb3
const contourWidth = 1.4
const cellSize = 1
const bandwidth = 30
const thresholds = 13

export default (data, width, height) => {

    // console.log('contours')
    
    const stage = new Graphics()
    stage.interactiveChildren = false
    stage.name = 'contours'
    stage.alpha = 1
    s.viewport.addChild(stage)

    const density = contourDensity()
        .x(d => d[0])
        .y(d => d[1])
        .weight(d => d[2].length)
        .size([window.innerWidth, window.innerHeight])
        .cellSize(cellSize)
        .bandwidth(bandwidth)
        .thresholds(thresholds)
        (data)

    const step = contourWidth / density.length
    let count = 1

    for (let i = density.length - 1; i >= 0; i--) {

        const width = contourWidth - step * count
        stage.lineStyle(width, color)
        count = count + 1

        density[i].coordinates.forEach(array => {
            array.forEach(array => {
                array.forEach(([x, y], i) => {
                    if (i == 0) stage.moveTo(x, y)
                    stage.lineTo(x, y)
                })
            })
            stage.closePath()
        })

    }

}