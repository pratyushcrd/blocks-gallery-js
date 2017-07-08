import Base from './base'

/**
 * Left and Right controllers for gallery
 * Uses `Base` as the base class
 */
class Controls extends Base {
  constructor(parent, rootEl, config) {
    super()
    /* Saving the configurations */
    this.addToStore('parent', parent)
    this.addToStore('root', rootEl)
    this.addToStore('config', config)
  }
}

export default Controls
