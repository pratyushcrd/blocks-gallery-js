/**
 *
 * @param {*number} height
 * @param {*number} width
 */
import Base from '../../Base'

function createBlocks(height, width, root) {
  const area = Math.round((height * width) / 100)
  const len = Math.round(Math.sqrt(area))
  const blocks = []
  for (let ii = 0; ii < 10; ii += 1) {
    for (let jj = 0; jj < 10; jj += 1) {
      const block = document.createElement('div')
      const img = document.createElement('img')

      const blockStyle = `height: ${len}px ; width: ${len}px; display: inline-block ;overflow: hidden;position:absolute;margin-left : ${len * jj}px;margin-top:${len * ii}px`
      const imgStyle = `position:absolute;height: ${height}px; width: ${width}px; left: -${jj * len}px; top: -${ii * len}px`

      block.setAttribute('height', `${len}px`)
      block.setAttribute('width', `${len}px`)
      block.setAttribute('style', blockStyle)
      img.setAttribute('src', '')
      img.setAttribute('style', imgStyle)
      block.appendChild(img)

      const blockElments = {
        div: block,
        img,
      }

      blocks[ii][jj].push(blockElments)
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
    for (let ii = 0; ii < 10; ii += 1) {
      for (let jj = 0; jj < 10; jj += 1) {
        const block = this.getFromStore('blocks')[ii][jj]
        callback(block.img, block.div, ii, jj)
      }
    }
  }
}

export default Grid
