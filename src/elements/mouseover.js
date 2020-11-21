import { select } from "d3-selection"

const space = '&nbsp;'
const line = '—————————————'
const block = '<span class="block"></span>'


export function mouseover(node) {

    const focus = select('body').append('div').attr('id', 'focus')

    // Heading

    focus.append('h2').html(node.name)
    focus.append('h3').html(`${node.docs} Publications`)

    // Tokens

    focus.append('p').html(space)
    focus.append('h3').html('Tokens by tf-idf')
    focus.append('p').html(line)
    Object.entries(node.tokens).slice(0, 20)
        .forEach(([key, value]) => {
            const blocks = block.repeat(value / 10)
            focus.append('p').html(`${blocks} &nbsp; ${key}`)
        })

    // Nationality

    focus.append('p').html(space)
    focus.append('h3').html('Co-author Nationalities')
    focus.append('p').html(line)
    Object.entries(node.nationalities).sort().forEach(([key, value], i) => {
        const blocks = block.repeat(value * 4)
        focus.append('p').html(`${blocks} &nbsp; ${key}`)
    })

    // Years

    focus.append('p').html(space)
    focus.append('h3').html('Publication Years')
    focus.append('p').html(line)

    Object.entries(node.years).forEach(([key, value], i) => {
        const blocks = block.repeat(value * 4)
        focus.append('p').html(`${blocks} &nbsp; ${key}`)
    })

}

export function mouseout() {

    select('#focus').remove()
    s.tokens = []

}