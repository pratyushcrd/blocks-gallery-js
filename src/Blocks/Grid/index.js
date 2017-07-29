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
  for (let i = 0; i < 10; i += 1) {
    for (let j = 0; j < 10; j += 1) {
      const block = document.createElement('div')
      const img = document.createElement('img')

      const blockStyle = `height: ${len}px ; width: ${len}px; display: inline-block ;overflow: hidden;position:absolute;margin-left : ${len * j}px;margin-top:${len * i}px`
      const imgStyle = `position:absolute;height: ${height}px; width: ${width}px; left: -${j * len}px; top: -${i * len}px`

      block.setAttribute('height', `${len}px`)
      block.setAttribute('width', `${len}px`)
      block.setAttribute('style', blockStyle)
      img.setAttribute('style', imgStyle)
      block.appendChild(img)

      const blockElements = {
        div: block,
        img,
      }

      blocks[i][j].push(blockElements)
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
