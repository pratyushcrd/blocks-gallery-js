import Base from './base'
import {pluckNumber} from './lib'
import defs from './defs'

class BlocksGallery extends Base{
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
    constructor (elementId, config) {
        super()
        /* Parse input configuration */
        this._parseInput(elementId, config);
    }

    /**
     * Parse input parameters of BlocksGallery
     * @private
     */
    _parseInput (elementId, config = {}) {
        let rootEl = document.getElementById(elementId)
        let height = pluckNumber(config.height, defs.height)
        let width = pluckNumber(config.width, defs.width)

        /* Throw error if element doesnt exists */
        if (!rootEl) {
            throw Error(`Element with id ${elementId} not found`)
        }
        /* Save the root element */
        this.addToStore('root',  rootEl)
    }
}

/* Export the BlocksGallery class */
export default BlocksGallery