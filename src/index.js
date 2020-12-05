// CSS

import '../node_modules/normalize.css/normalize.css'
import './constant/index.css'

// Libraries

import { json, xml } from 'd3-fetch'


// Data

import nodesJSON from './data/nodes.json'
import linksJSON from './data/links.json'
import tripletsJSON from './data/triplets.json'

import search from './elements/search'
import stats from './elements/stats'

// Init

import fps from './elements/fps.js'

import background from './draw/background'
import clusters from './draw/clusters.js'
import contours from './draw/contours.js'
import links from './draw/links.js'
import keywords_close from './draw/keywords_close.js'
import keywords_distant from './draw/keywords_distant.js'
import nodes from './draw/nodes.js'

import * as PIXI from 'pixi.js'
import { Viewport } from 'pixi-viewport'
import { scaleLinear } from 'd3-scale'
import { extent } from "d3-array"
import arialXML from '/arial.xml'

// Global variables

window.s = {
    distance: 30,
    links,
    nodes,
    tokens: []
}

// Start

Promise.all([
    json(linksJSON),
    json(nodesJSON),
    json(tripletsJSON)
    // xml(arialXML)

]).then(([linksData, nodesData, tripletsData]) => {

    s.links = linksData; console.log('nodes', s.nodes.length)
    s.nodes = nodesData; console.log('links', s.links.length)
    s.triplets = tripletsData; console.log('triplets', s.triplets.length)

    // Set App

    s.app = new PIXI.Application({
        width: window.innerWidth, height: window.innerHeight,
        antialias: true,
        transparent: true,
        resolution: 2,
        autoDensity: true,
        autoResize: true,
        resizeTo: window
    })
    document.body.prepend(s.app.view)

    // Create and append viewport

    s.pixi = new Viewport({
        screenWidth: window.innerWidth, screenHeight: window.innerHeight,
        interaction: s.app.renderer.plugins.interaction
    })
    s.app.stage.addChild(s.pixi)

    // Set scales

    const extX = extent(s.nodes, d => d.x)
    const extY = extent(s.nodes, d => d.y)
    const width = extX[1] - extX[0]
    const height = extY[1] - extY[0]
    const scaleX = window.innerWidth / width
    const scaleY = window.innerHeight / height

    const printing = false // costant for export canvas
    let scale = scaleX < scaleY ? scaleX : scaleY
    scale = printing ? scale * 10 : scale

    const zoomMin = scale * .9
    const zoomMax = 3

    // Set vieport

    s.pixi.drag().pinch().wheel().decelerate()
        .clampZoom({ minScale: zoomMin, maxScale: zoomMax })
        .setTransform(window.innerWidth / 2, window.innerHeight / 2, scale, scale)

    // Transparency on zoom

    const zoomOut = scaleLinear().domain([zoomMin, 2]).range([1, 0])
    const zoomIn = scaleLinear().domain([zoomMin, 2]).range([0, 1])

    s.pixi.on('zoomed', e => {
        const scale = e.viewport.lastViewport.scaleX
        e.viewport.children.find(child => child.name == 'contours').alpha = zoomOut(scale)
        e.viewport.children.find(child => child.name == 'nodes').alpha = zoomIn(scale)
        e.viewport.children.find(child => child.name == 'keywords_close').alpha = zoomIn(scale)
        e.viewport.children.find(child => child.name == 'keywords_distant').alpha = zoomOut(scale)
    })

    // Font Loading and Rendering

    const onFontLoad = (() => {

        background()
        links()
        contours()
        nodes()
        keywords_close()
        keywords_distant()
        // clusters()

        fps()
        search()

    })

    s.app.loader
        .add('Arial', arialXML)
        .load(onFontLoad)

    // Settings on the Interface

    window.onresize = function () {
        s.pixi.resize() // Prevent pinch gesture in Chrome
    }

    window.addEventListener('wheel', e => {
        e.preventDefault() // Prevent wheel interference
    }, { passive: false })

    // Export PNG

    // s.app.renderer.extract.canvas(s.app.stage).toBlob((b) => {
    //     const a = document.createElement('a')
    //     document.body.append(a)
    //     a.download = 'screenshot'
    //     a.href = URL.createObjectURL(b)
    //     a.click()
    //     a.remove()
    // }, 'image/png')

})