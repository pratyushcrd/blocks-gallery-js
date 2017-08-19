/**
 *
 * @param {*number} height
 * @param {*number} width
 */
const Base = require('../../Base/Base')
/**
 *
 * Calculating the length of the image element block on the given area
 * @param {*number} height : Defines the height
 * @param {*number} width : Defines the width
 * @param {*number} blockNumber: Defines the number of blocks
 */
function getLength(width, height, length) {
  return {
    length,
    xBlocks: (width / length) % 10 === 0 ? width / length : (width / length),
    yBlocks: (height / length) % 10 === 0 ? height / length : (height / length),
  }
  // const area = Math.round((height * width) / blockNumber)
  // return Math.round(Math.sqrt(area))
}
/**
 * Fuction to create image blocks
 * @param {*object} root : root element to which the bock need to be appended
 * @param {*number} height : height of the image
 * @param {*number} width : width of the image
 */
function createBlocks(width, height, length = 60) {
  const paper = this.getFromEnv('paper')
  const imgGroup = this.getFromStore('gridGroup')
  // Defining the element's property
  const block = getLength(width, height, length)
  this.addToStore('blockConfig', block)
  let xCord = 0
  let yCord = 0
  const gridGroup = []
  let mask
  for (let i = 0; i < block.yBlocks; i += 1) {
    xCord = 0
    gridGroup[i] = []
    for (let j = 0; j < block.xBlocks; j += 1) {
      // Creating the image element
      const img = paper.image('', 0, 0, width, height)
      // Create the mask
      mask = paper
        .rect(xCord, yCord, block.length, block.length)
        .attr({
          fill: '#fff',
        })
      img.attr({
        mask,
      })
      // Adding image to the gorup
      imgGroup.add(img)
      // Setting the x coordinate for the next image
      xCord += block.length
      gridGroup[i].push({
        img,
      })
    }
    // Setting the y coordinate for the next image
    yCord += block.length
  }
  return gridGroup
}


class Grid extends Base {
  /**
   *
   * @param {*object} parent
   * @param {*object} root : Element to which the blocks will be appended
   */
  constructor(parent, parentGroup) {
    super(parent)
    const config = this.getFromEnv('config')
    const paper = this.getFromEnv('paper')

    const gridGroup = paper
      .group()
      .attr({
        id: 'blocks-gallery-gird',
      })
    parentGroup.add(gridGroup)
    this.addToStore('gridGroup', gridGroup)
    const height = config.height
    const width = config.width
    // Initializing all the image elements and adding them to the store
    this.addToStore('gridBlocks', createBlocks.call(this, width, height))
  }
  /**
   * To be used to iterate over all the div and image elements
   * and call the callback
   * @param {*function} callback
   */
  iterate(callback) {
    const blockConfig = this.getFromStore('blockConfig')
    for (let i = 0; i < blockConfig.yBlocks; i += 1) {
      for (let j = 0; j < blockConfig.xBlocks; j += 1) {
        const block = this.getFromStore('gridBlocks')[i][j]
        callback(block, i, j)
      }
    }
  }
}

module.exports = Grid
