import { select, group } from 'd3'

const space = '&nbsp;'
const line = '—————————————'
const block = '<span class="block"></span>'


export function click(node, index) {

    select('#focus').remove()
    const focus = select('body').append('div').attr('id', 'focus')


    // Heading

    focus.append('h2').html(node[3])
    // focus.append('h3').html(`${node.docs} Publications`)

    
    // Frequency

    focus.append('p').html(space)
    focus.append('h3').html('Word Frequency')
    focus.append('p').html(line)

    const lemmas = Array.from(group(node[2], d => d), ([key, value]) => [key, value.length])
        .sort((a, b) => b[1] - a[1]).slice(0,20)

    lemmas.forEach(lemma => {
            const blocks = block.repeat(lemma[1])
            focus.append('p').html(`${blocks} &nbsp; ${lemma[0]}`)
        })

}