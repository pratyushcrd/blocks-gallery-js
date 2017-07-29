import Base from '../Base/'

/**
 * Left and Right controllers for gallery
 * Uses `Base` as the base class
 */
class Controls extends Base {
  constructor(parent, rootEl, config) {
    super(parent)
    /* Saving the configurations */
    this.addToStore('root', rootEl)
    this.addToStore('config', config)
  }
}

export default Controls
