/**
 *
 * @param {*number} height
 * @param {*number} width
 */
import Base from '../../Base'
/**
 * Function to set the one block property
 * @param {*object} el : element whose property is to set
 * @param {*object} style : object of the properties
 */
function blockStyle(el, config) {
  const blockEl = el
  blockEl.style.position = 'absolute'
  blockEl.style.width = config.side
  blockEl.style.height = config.side
  blockEl.style.marginTop = `-${config.y * config.len}px`
  blockEl.style.marginLeft = `-${config.x * config.len}px`
  blockEl.style.display = 'inline-block'
  blockEl.style.overflow = 'hidden'
}
/**
 * Function to set the one img property
 * @param {*object} el : element whose property is to set
 * @param {*object} style : object of the properties
 */
function blockImgStyle(el, config) {
  const blockImgEl = el
  blockImgEl.style.position = 'absolute'
  blockImgEl.style.width = config.width
  blockImgEl.style.height = config.height
  blockImgEl.style.top = `-${config.y * config.len}px`
  blockImgEl.style.left = `-${config.x * config.len}px`
}

/**
 * Fuction to create blocks
 * @param {*object} root : root element to which the bock need to be appended
 * @param {*number} height : height of the image
 * @param {*number} width : width of the image
 */
function createBlocks(root, height, width) {
  const area = Math.round((height * width) / 100)
  const len = Math.round(Math.sqrt(area))
  const elemProperty = {
    height,
    width,
    len,
  }
  const blocks = []
  for (let i = 0; i < 10; i += 1) {
    blocks[i] = []
    for (let j = 0; j < 10; j += 1) {
      elemProperty.x = j
      elemProperty.y = i
      const block = document.createElement('div')
      const img = document.createElement('img')
      // Setting the property of the div block
      blockStyle(block, elemProperty)
      // Setting the property of the image
      blockImgStyle(img, elemProperty)
      block.appendChild(img)
      // Appending to the root element
      root.appendChild(block)
      
      const blockElements = {
        div: block,
        img,
      }
      // Collection of blocks
      blocks[i][j] = blockElements
    }
  }
  return blocks
}


class Grid extends Base {
  /**
   *
   * @param {*object} parent
   * @param {*object} root : Element to which the blocks will be appended
   */
  constructor(parent, root) {
    super(parent)
    const height = this.getFromEnv('config.height')
    const width = this.getFromEnv('config.width')
    this.addToStore('blocks', createBlocks(root, height, width))
  }
  /**
   * To be used to iterate over all the div and image elements
   * and call the callback
   * @param {*function} callback
   */
  iterate(callback) {
    for (let i = 0; i < 10; i += 1) {
      for (let j = 0; j < 10; j += 1) {
        const block = this.getFromStore('blocks')[i][j]
        callback(block.img, block.div, i, j)
      }
    }
  }
}

export default Grid
