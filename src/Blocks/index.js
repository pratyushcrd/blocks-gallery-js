import Base from '../Base'
import Grid from './Grid'

function customizeBlockEl(el, config) {
  const blocksEl = el
  blocksEl.style.height = `${config.height}px`
  blocksEl.style.width = `${config.width}px`
  blocksEl.style.position = 'absolute'
  blocksEl.style.top = '0px'
  blocksEl.style.left = '0px'
}

/**
 * Component responsible for blocks management of image,
 * responsible for querying image and show / hide or animate
 * when required
 */
class Blocks extends Base {
  constructor(parent, renderer) {
    super(parent)

    const rootEl = this.getFromEnv('root')
    const blocksEl = document.createElement('div')

    // Append child to rootEl
    rootEl.appendChild(blocksEl)

    customizeBlockEl(blocksEl, this.getFromEnv('config'))

    // Add renderer to store
    this.addToStore('renderer', renderer)
    // Add blocks node to store
    this.addToStore('blocksEl', blocksEl)
    // Initialize grid for the block instance
    this.addToStore('grid', new Grid(this, blocksEl))
  }

  show() {
    this.getFromStore('blocksEl').style.visibility = 'visible'
  }

  hide() {
    this.getFromStore('blocksEl').style.visibility = 'hidden'
  }

  animate(fn) {
    const currentImage = this.getFromStore('renderer').getCurrent().imageSrc
    this.getFromStore('grid').iterate((img) => {
      img.setAttribute('src', currentImage)
      if (Math.random() > 0.4) {
        img.style.display = 'block'
      } else {
        img.style.display = 'none'
      }
    })
    setTimeout(() => {
      fn()
    }, 1000)
  }
}

export default Blocks
