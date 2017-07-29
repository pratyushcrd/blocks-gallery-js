/**
 *
 * @param {*number} height
 * @param {*number} width
 */
import Base from '../../Base'

function createBlocks(height, width) {
  const area = Math.round((height * width) / 100)
  const len = Math.round(Math.sqrt(area))
  const blocks = []
  for (let ii = 0; ii < 10; ii += 1) {
    for (let jj = 0; jj < 10; jj += 1) {
      const block = document.createElement('div')
      block.setAttribute('height', `${len}px`)
      block.setAttribute('width', `${len}px`)
      const blockStyle = `height: ${len}px ; width: ${len}px; display: inline-block ;overflow: hidden;position:absolute;margin-left : ${len * jj}px;margin-top:${len * ii}px`
      block.setAttribute('style', blockStyle)
      const img = document.createElement('img')
      const imgStyle = `position:absolute;height: ${height}px; width: ${width}px; left: -${jj * len}px; top: -${ii * len}px`
      img.setAttribute('src', 'https://yt3.ggpht.com/-l_QP1zl2r8M/AAAAAAAAAAI/AAAAAAAAAAA/cT2or6THTKI/s900-c-k-no-mo-rj-c0xffffff/photo.jpg')
      img.setAttribute('style', imgStyle)
      block.appendChild(img)
      blocks.push(block)
      document.body.appendChild(block)
    }
  }
}

class Grid extends Base {
  constructor(parent, root) {
    super(parent)
    const height = this.getFromEnv('height')
    const width = this.getFromEnv('width')
    createBlocks(root, height, width)
    console.log('FUCoff')
  }
  iterator(callback) {
    console.log(callback)
  }
}

export default Grid
