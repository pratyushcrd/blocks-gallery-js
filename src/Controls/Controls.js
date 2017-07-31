import Base from '../Base/Base'

/**
 * Left and Right controllers for gallery
 * Uses `Base` as the parent class
 */
class Controls extends Base {
  /**
   * Initialize controls
   * @param {Base} parent Parent class that invokes Controls
   * @param {Snap} paper SnapSvg instance
   * @param {Object} config Parsed configurations objetc
   */
  constructor(parent, paper, config) {
    super(parent)
    /* Saving the configurations */
    this.addToStore('paper', paper)
    this.addToStore('config', config)
  }
}

export default Controls
