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
function getLength(width, height, length) {
  return {
    length,
    xBlocks: (width / length) % 10 === 0 ? width / length : (width / length) + 1,
    yBlocks: (height / length) % 10 === 0 ? height / length : (height / length) + 1,
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
        .rect(xCord, yCord, xCord + block.length, yCord + block.length)
        .attr({
          fill: '#fff',
        })
      img.attr({
        mask,
      })
      const fn = () => (Math.random() * 266) << 0
      const ttmpBox = paper
        .rect(xCord, yCord, block.length, block.length)
        .attr({
          stroke: `rgba(${fn()},${fn()},${fn()},1)`,
          'stroke-width': '1',
          fill: 'rgba(0,0,0,0)',
        })
      // Adding image to the gorup
      imgGroup.add(img)
      imgGroup.add(ttmpBox)
      // Setting the x coordinate for the next image
      xCord += block.length
      gridGroup[i].push({
        img,
        mask,
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
    for (let i = 0; i < 10; i += 1) {
      for (let j = 0; j < 10; j += 1) {
        const block = this.getFromStore('gridBlocks')[i][j]
        callback(block.img, block.div, i, j)
      }
    }
  }
}

export default Grid
