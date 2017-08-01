import Base from '../Base/Base'
import Grid from './Grid/Grid'

/**
 * Component responsible for blocks management of image,
 * responsible for querying image and show / hide or animate
 * when required
 */
class Blocks extends Base {
  constructor(parent, renderer) {
    super(parent)

    const paper = this.getFromEnv('paper')
    const blocksGroup = paper
      .group()
      .attr({
        id: 'blocks-group',
      })

    // Add renderer to store
    this.addToStore('renderer', renderer)
    // Add blocks node to store
    this.addToStore('blocksGroup', blocksGroup)
    // Initialize grid for the block instance
    this.addToStore('grid', new Grid(this, blocksGroup))
    // Hidden initially
    this.hide()
  }

  show() {
    this.getFromStore('blocksGroup').show()
  }

  hide() {
    this.getFromStore('blocksGroup').hide()
  }

  animate(fn) {
    const currentImage = this.getFromStore('renderer').getCurrent().imageSrc
    this.getFromStore('grid').iterate((img) => {
      img.attr({
        href: currentImage,
      })
      if (Math.random() > 0.4) {
        img.show()
      } else {
        img.hide()
      }
    })
    setTimeout(() => {
      fn()
    }, 1000)
  }
}

export default Blocks
