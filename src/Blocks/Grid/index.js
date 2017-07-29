/**
 *
 * @param {*number} height
 * @param {*number} width
 */
import Base from '../../Base'
/**
 * Function to set the one block property
 * @param {*number} side : length of the block side
 * @param {*number} x : x coordinate of the plot
 * @param {*number} y : y coordinate of the plot
 * @param {*string} style : previous style if there any
 */
function blockStyle(side, x, y, style = '') {
  return `${style} height: ${side}px ; width: ${side}px; display: inline-block ;overflow: hidden;position:absolute;margin-left : ${side * x}px;margin-top:${side * y}px`
}
/**
 * Function to set the one img property
 * @param {*number} side : length of the block side
 * @param {*number} x : x coordinate of the plot
 * @param {*number} y : y coordinate of the plot
 * @param {*number} height : height of the image
 * @param {*number} width : width of the image
 * @param {*string} style : previous style if there any
 */
function blockImgStyle(side, x, y, height, width, style = '') {
  return `${style};position:absolute;height: ${height}px; width: ${width}px; left: -${x * side}px; top: -${y * side}px`
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
  const blocks = []
  for (let i = 0; i < 10; i += 1) {
    blocks[i] = []
    for (let j = 0; j < 10; j += 1) {
      const block = document.createElement('div')
      const img = document.createElement('img')
      const divStyle = blockStyle(len, j, i, '')
      const imgStyle = blockImgStyle(len, j, i, height, width, '')
      block.setAttribute('height', `${len}px`)
      block.setAttribute('width', `${len}px`)
      block.setAttribute('style', divStyle)
      img.setAttribute('style', imgStyle)
      block.appendChild(img)

      const blockElements = {
        div: block,
        img,
      }
      blocks[i][j] = blockElements
      root.appendChild(block)
    }
  }
  return blocks
}

class Grid extends Base {
  constructor(parent, root) {
    super(parent)
    const height = this.getFromEnv('height')
    const width = this.getFromEnv('width')
    this.addToStore('blocks', createBlocks(root, height, width))
  }

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
