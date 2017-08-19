const Base = require('../Base/Base')
const Grid = require('./Grid/Grid')
const Animation = require('./Animation/Animation')
const { blankFn } = require('../lib/lib')

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
    // Adding a callback array to store
    this.addToStore('callbackArray', [])
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
    const callbackArr = this.getFromStore('callbackArray')
    const promiseArr = []
    // Show blocks beforre animating
    this.show()
    /* Iterate over all blocks, call the animation functions
      and store them in promise array */
    this.getFromStore('grid').iterate((block, rowIndex, colIndex) => {
      callbackArr[rowIndex] = callbackArr[rowIndex] || []
      /* Stop any on-going animation and set default attrs */
      block.img.stop()
      /* call the resolver function to set
        default attrs */
      if (callbackArr[rowIndex][colIndex]) {
        callbackArr[rowIndex][colIndex]()
      }
      /* Set new image source */
      block.img.attr({
        href: currentImage,
      })
      let attrs = {}
      callbackArr[rowIndex][colIndex] = () => {
        block.img.attr(attrs)
        callbackArr[rowIndex][colIndex] = blankFn
      }
      const promise = new Promise((resolve) => {
        attrs = animation(block, () => {
          resolve()
        }, rowIndex, colIndex)
      })
      promiseArr.push(promise)
    })
    /* Fire callback when all animations end */
    Promise
      .all(promiseArr)
      .then(() => {
        /* Execute callback by parent */
        /* Hide block after animation */
        this.hide()
        /* Execute animation callbacks */
        callbackArr.forEach((callbackRack) => {
          callbackRack.forEach((callback) => {
            callback()
          })
        })
      })
  }
}

module.exports = Blocks
