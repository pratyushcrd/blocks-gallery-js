import {pluckNumber} from './lib'
import defs from './defs'

class BlocksGallery {
    constructor (elementId, config = {}) {
        let rootEl = document.getElementById(elementId)
        let height = pluckNumber(config.height, defs.height)
        let width = pluckNumber(config.width, defs.width)
        
        /* Throw error if element doesnt exists */
        if (!rootEl) {
            throw Error(`Element with id ${elementId} not found`)
        }
    }
}

/* Export the BlocksGallery class */
export default BlocksGallery