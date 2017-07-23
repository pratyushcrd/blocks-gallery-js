import Base from './Base'
import { pluckNumber } from './lib'
import defs from './defs'
import Controls from './Controls'
import Renderer from './Renderer'

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
     *   src: [{
     *     image: 'path/to/image',
     *     title: 'title string',
     *     text: 'text string'
     *   }]
     * })
     */
  constructor(elementId, rawConfig) {
    // Making the environment variable
    // Every instance will have its own environment
    // variable
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
    /* Applying height and width */
    rootEl.style.height = height
    rootEl.style.width = width

    /* Save the root element */
    this.addToEnv('root', rootEl)
    /* Saving config */
    this.addToEnv('config', config)
    /* Creating controllers for gallery */
    this.addToEnv('controls', new Controls(this))
    /* Creating handler to render the images */
    this.addToEnv('renderer', new Renderer(this))
  }
}

/* Export the BlocksGallery class */
export default BlocksGallery
