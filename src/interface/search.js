import { Point } from 'pixi.js'
import autoComplete from '@tarekraafat/autocomplete.js'

export default (data) => {

    // Data

    const dataSearch = data.reduce((array, record) => {
        array.push({
            name: record[3], x: record[0], y: record[1],
        })
        return array
    }, []).sort((a, b) => {
        if (a.name < b.name) return -1
        else return 1
    })

    // The autoComplete.js Engine instance creator

    const autoCompletejs = new autoComplete({

        placeHolder: 'Search by name',
        threshold: 2,

        data: {
            src: dataSearch,
            keys: ['name'],
        },

        resultsList: {
            element: (list, data) => {
                if (!data.results.length) {
                    const message = document.createElement("div");
                    message.setAttribute("class", "no_result");
                    message.innerHTML = `<span>Found No Results for "${data.query}"</span>`;
                    list.prepend(message);
                }
            },
            // maxResults: 10,
            noResults: true,
        },

        resultItem: {
            highlight: {
                render: true
            },
        },

        events: {
            input: {
                selection: (event) => {

                    const { x, y, name } = event.detail.selection.value
                    const center = { x: s.viewport.center.x, y: s.viewport.center.y }

                    document.querySelector("#autoComplete").value = name

                    // Zooming from distant to close

                    const zoomIn = () => s.viewport.animate({
                        scale: 10,
                        position: new Point(x, y),
                        time: 1000,
                        ease: 'easeInOutSine',
                    })

                    // Zooming from close to close

                    const zoomOutIn = () => s.viewport.animate({
                        scale: 1,
                        position: new Point((x + center.x) / 2, (y + center.y) / 2),
                        time: 1000,
                        ease: 'easeInOutSine',
                        callbackOnComplete: () => {
                            s.viewport.animate({
                                scale: 10,
                                position: new Point(x, y),
                                time: 1000,
                                ease: 'easeInOutSine',
                            })
                        }
                    })

                    if (s.viewport.scale.x < 10)
                        zoomIn()
                    else
                        zoomOutIn()
                }
            }
        } // Event's end



    })

}