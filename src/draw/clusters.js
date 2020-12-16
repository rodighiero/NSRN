import { Graphics } from 'pixi.js'
import { group, polygonHull } from 'd3'


export default () => {

    const stage = new Graphics()
    stage.interactiveChildren = false
    stage.name = 'clusters'
    s.viewport.addChild(stage)

    const clusters = group(s.nodes, n => n.cluster)

    const width = 3
    const color = 0x999999

    clusters.forEach(cluster => {

        const points = cluster.map(node => [node.x, node.y])
        const polygon = polygonHull(points)

        stage.lineStyle(width, color)

        stage.beginFill(color, 0.1)

        if (polygon) {
            polygon.forEach((point, i) => {
                if (i == 0) stage.moveTo(point[0], point[1])
                stage.lineTo(point[0], point[1])
            })
            stage.closePath()
        }

    })

}