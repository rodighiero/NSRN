// CSS

import '../node_modules/normalize.css/normalize.css'
import './constant/index.css'

// Libraries

import { json, xml } from 'd3-fetch'


// Data

import nodesJSON from './data/nodes.json'
import linksJSON from './data/links.json'
import tripletsJSON from './data/triplets.json'
import arialXML from './constant/arial.xml'

import search from './elements/search'
import stats from './elements/stats'

// Init

import pixi from './elements/pixi.js'
import fps from './elements/fps.js'

import background from './draw/background'
import clusters from './draw/clusters.js'
import contours from './draw/contours.js'
import links from './draw/links.js'
import keywords_close from './draw/keywords_close.js'
import keywords_distant from './draw/keywords_distant.js'
import nodes from './draw/nodes.js'

// Global variables

window.s = {
    distance: 30,
    links,
    nodes,
    tokens: []
}

// Start

Promise.all([
    json(nodesJSON),
    json(linksJSON),
    json(tripletsJSON),
    xml(arialXML)

]).then(([nodesData, linksData, tripletsData, arialXML]) => {

    s.links = linksData
    s.nodes = nodesData
    s.triplets = tripletsData
    console.log('nodes', s.nodes.length)
    console.log('links', s.links.length)
    console.log('triplets', s.triplets.length)
    
    pixi(arialXML)
    
    background()
    links()
    contours()
    nodes()
    keywords_close()
    keywords_distant()
    // clusters()
    
    fps()
    search()

    window.onresize = function () {
        s.pixi.resize()
    }

})