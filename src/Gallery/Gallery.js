import Snap from 'imports-loader?this=>window,fix=>module.exports=0!snapsvg/dist/snap.svg.js'
import Base from '../Base/Base'
import { pluckNumber } from '../lib/lib'
import defs from '../defs/defs'
import Controls from '../Controls/Controls'
import Renderer from '../Renderer/Renderer'
import Blocks from '../Blocks/Blocks'
import extendSnap from '../lib/extendSnap'

/* extend feature of SnapSvg */
extendSnap(Snap)

function animateBlocks(blocks) {
  /* Animate blocks */
  blocks.animate()
}

class BlocksGallery extends Base {
  /**
     * Constructor for BlocksGallery
     * @param {string} elementId Id of dom element
     * @param {Object} config Configuration object for BlocksGallery
     * @example
     * new BlocksGallery('my-gallery-2', {
     *   height: 500,
     *   width: 400,
     *   controls: true,
     *   anim: 'fall',
     *   src: [{
     *     image: 'path/to/image',
     *     title: 'title string',
     *     text: 'text string'
     *   }]
     * })
     */
  constructor(elementId, rawConfig) {
    /**
     * Making the environment variable
     * Every instance will have its own environment
     *  object
     */
    super({
      isEnvVariable: true,
    })
    /* Parse input configuration */
    const rootEl = document.getElementById(elementId)
    const config = Object.assign({}, rawConfig)
    const height = pluckNumber(config.height, defs.height)
    const width = pluckNumber(config.width, defs.width)
    config.height = height
    config.width = width

    /* Throw error if element doesnt exists */
    if (!rootEl) {
      throw Error(`Element with id ${elementId} not found`)
    }
    /* Create paper instance from Snap */
    const paper = new Snap(width, height)
    /* Append SnapSvg element to user's container */
    rootEl.appendChild(paper.node)
    /* Applying height and width */
    rootEl.style.height = height
    rootEl.style.width = width

    /* Save the root element */
    this.addToEnv('paper', paper)
    /* Saving config */
    this.addToEnv('config', config)
    /* Creating handler to render the images */
    const renderer = new Renderer(this)
    this.addToStore('renderer', renderer)
    /* Creating handler to manage the grids */
    this.addToStore('blocks', new Blocks(this, renderer))
    /* Creating controllers for gallery */
    this.addToStore('controls', new Controls(this))
  }
  /**
   * Show next image in list
   */
  next() {
    animateBlocks(this.getFromStore('blocks'))
    this.getFromStore('renderer').next()
  }
  /**
   * Show previous image in list
   */
  previous() {
    animateBlocks(this.getFromStore('blocks'))
    this.getFromStore('renderer').previous()
  }
}

/* Export the BlocksGallery class */
export default BlocksGallery
