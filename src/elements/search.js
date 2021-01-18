import { Point } from 'pixi.js'
import autoComplete from '@tarekraafat/autocomplete.js'

export default () => {

    // Listner
    // document.querySelector("#autoComplete").addEventListener("autoComplete", event => {
    //     console.log(event)
    // })

    // The autoComplete.js Engine instance creator

    const autoCompletejs = new autoComplete({

        // Data declaration

        data: {
            src: async () => {
                return s.nodes.reduce((array, { tokens, name, x, y }) => {
                    array.push({
                        token: `${Object.keys(tokens)[0]} (${Object.values(tokens)[0]})`,
                        name: name,
                        x: x, y: y,
                    })
                    return array
                }, [])
            },
            key: ['name'],
            // key: ['token', 'name'],
            cache: true
        },
        sort: (a, b) => {
            if (a.match < b.match) return -1
            if (a.match > b.match) return 1
            return 0
        },
        placeHolder: 'Search',
        maxResults: 20,
        onSelection: feedback => {

            console.log(feedback)

            const key = feedback.selection.key
            const node = feedback.selection.value
            const { x, y, name } = node
            const center = { x: s.viewport.center.x, y: s.viewport.center.y }

            document.querySelector("#autoComplete").value = name

            // Zooming from distant to close

            const zoomIn = () => s.viewport.animate({
                scale: s.zoomMax,
                position: new Point(x, y),
                time: 2000,
                ease: 'easeInOutSine',
            })

            // Zooming from close to close

            const zoomOutIn = () => s.viewport.animate({
                scale: s.zoomMin,
                position: new Point((x + center.x) / 2, (y + center.y) / 2),
                time: 2000,
                ease: 'easeInOutSine',
                callbackOnComplete: () => {
                    s.viewport.animate({
                        scale: s.zoomMax,
                        position: new Point(x, y),
                        time: 2000,
                        ease: 'easeInOutSine',
                    })
                }
            })

            if (s.viewport.scale.x < 1)
                zoomIn()
            else
                zoomOutIn()


        }
    })

}