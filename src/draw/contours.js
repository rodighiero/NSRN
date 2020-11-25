import * as PIXI from 'pixi.js'
import { extent } from "d3-array"
import { contourDensity } from "d3-contour"

const color = 0x999999
const contourWidth = 1
const cellSize = 5
const bandwidth = 30
const thresholds = 15

export default () => {

    const stage = new PIXI.Graphics()
    s.pixi.addChild(stage)
    
    stage.interactiveChildren = false

    const extX = extent(s.nodes, d => d.x)
    const extY = extent(s.nodes, d => d.y)
    const width = extX[1] - extX[0]
    const height = extY[1] - extY[0]
    const x = extX[0]
    const y = extY[0]

    const density = contourDensity()
        .x(d => d.x - x)
        .y(d => d.y - y)
        .weight(d => d.relevancy)
        .size([width, height])
        .cellSize(cellSize)
        .bandwidth(bandwidth)
        .thresholds(thresholds)
        (s.nodes)

    density.forEach(d => d.coordinates = d.coordinates
        .map(d => d.map(d => d.map(d => [d[0] + x, d[1] + y]))))


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