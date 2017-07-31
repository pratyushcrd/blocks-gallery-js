/**
 *
 * @param {*number} height
 * @param {*number} width
 */
import Base from '../../Base/Base'
/**
 *
 * Calculating the length of the image element block on the given area
 * @param {*number} height : Defines the height
 * @param {*number} width : Defines the width
 * @param {*number} blockNumber: Defines the number of blocks
 */
function getLength(height, width, blockNumber = 100) {
  const area = Math.round((height * width) / blockNumber)
  return Math.round(Math.sqrt(area))
}
/**
 * Fuction to create image blocks
 * @param {*object} root : root element to which the bock need to be appended
 * @param {*number} height : height of the image
 * @param {*number} width : width of the image
 */
function createBlocks(height, width) {
  const paper = this.getFromEnv('paper')
  const imgGroup = this.getFromStore('gridGroup')
  // Defining the element's property
  const elem = {
    len: getLength(height, width),
  }
  elem.x = 0
  elem.y = 0
  console.log(elem)
  const imgBlocks = []
  for (let i = 0; i < 10; i += 1) {
    for (let j = 0; j < 10; j += 1) {
      // Creating the image element
      const img = paper.image('https://www.w3schools.com/css/trolltunga.jpg', elem.x, elem.y, elem.len, elem.len)
      // Adding image to the gorup
      imgGroup.add(img)
      // Setting the x coordinate for the next image
      elem.x += elem.len
      imgBlocks.push(img)
    }
    // Setting the y coordinate for the next image
    elem.y += elem.len
  }
  return imgBlocks
}


class Grid extends Base {
  /**
   *
   * @param {*object} parent
   * @param {*object} root : Element to which the blocks will be appended
   */
  constructor(parent, root) {
    super(parent)
    const config = this.getFromEnv('config')
    const paper = this.getFromEnv('paper')

    const gridGroup = paper
      .group()
      .attr({
        id: 'blocks-gallery-gird',
      })
    this.addToStore('gridGroup', gridGroup)
    const height = config.height
    const width = config.width
    // Initializing all the image elements and adding them to the store
    const gridBlocks = createBlocks.call(this, height, width)
    this.addToStore('gridBlocks', gridBlocks)
  }
  /**
   * To be used to iterate over all the div and image elements
   * and call the callback
   * @param {*function} callback
   */
  iterate(callback) {
    for (let i = 0; i < 10; i += 1) {
      for (let j = 0; j < 10; j += 1) {
        const block = this.getFromStore('gridBlocks')[i][j]
        callback(block.img, block.div, i, j)
      }
    }
  }
}

export default Grid
