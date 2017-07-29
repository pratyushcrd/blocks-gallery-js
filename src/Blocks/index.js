import Base from '../Base'
import Grid from './Grid'

/**
 * Component responsible for blocks management of image,
 * responsible for querying image and show / hide or animate
 * when required
 */
class Blocks extends Base {
  constructor(parent, renderer) {
    super(parent)

    const rootEl = this.getFromEnv('root')
    const blocksEl = document.createElement('div')

    // Append child to rootEl
    rootEl.appendChild(blocksEl)

    // Add renderer to store
    this.addToStore('renderer', renderer)
    // Add blocks node to store
    this.addToStore('blocksEl', blocksEl)
    // Initialize grid for the block instance
    this.addToStore('grid', new Grid(this, blocksEl))
  }
}

export default Blocks
