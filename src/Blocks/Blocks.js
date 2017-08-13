import Base from '../Base/Base'
import Grid from './Grid/Grid'
import Animation from './Animation/Animation'

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

  animate() {
    const animType = this.getFromEnv('config').anim
    const animation = Animation.get(animType, 1)
    const currentImage = this.getFromStore('renderer').getCurrent().imageSrc
    const promiseArr = []
    // Show blocks beforre animating
    this.show()
    /* Iterate over all blocks, call the animation functions
      and store them in promise array */
    this.getFromStore('grid').iterate((block, rowIndex, colIndex) => {
      block.img.attr({
        href: currentImage,
      })
      promiseArr.push(animation(block, rowIndex, colIndex))
    })
    /* Fire callback when all animations end */
    Promise
      .all(promiseArr)
      .then((animCallbacks) => {
        /* Execute callback by parent */
        /* Hide block after animation */
        this.hide()
        /* Execute animation callbacks */
        animCallbacks.forEach(animCallback => animCallback())
      })
  }
}

export default Blocks
