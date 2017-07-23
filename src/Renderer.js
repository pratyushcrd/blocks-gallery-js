import { pluck } from './lib'
import Base from './Base'
/**
 * Function to create list item of gallery
 * based on provided object
 * @param {Object} object Info for current element
 * @param {Object} config Global config
 */
function getListItemImage(object, config) {
  const container = document.createElement('div')
  const image = document.createElement('img')
  const text = document.createElement('div')
  // Applying image attributes
  image.setAttribute('height', config.height)
  image.setAttribute('width', config.width)
  image.setAttribute('src', object.image)
  // Applying text attributes
  text.textContent = pluck(object.text, '')
  // Appending elements to container
  container.appendChild(image)
  container.appendChild(text)
  // Return all the elements
  return {
    container,
    image,
    text,
  }
}
/**
 * @private
 * Function to mark positions as visible and the corresponding element visible
 * and the previous element hidden
 */
function setVisible(pos) {
  const currentActivePos = this.getFromStore('activePosition')
  const domCollection = this.getFromStore('domCollection')
  // Proceed if valid
  if (pos < domCollection.length && currentActivePos !== pos) {
    // Make current position visible
    domCollection[pos].container.style.display = ''
    // Make previous position hidden
    // check since in first time currentActivePos
    // is undefined
    if (domCollection[currentActivePos]) {
      domCollection[currentActivePos].container.style.display = 'none'
    }
    // Mark the given position as active
    this.addToStore('activePosition', pos)
  }
}
/**
 * @private
 * Private method for Renderer to render Images in actual dom
 */
function renderImages() {
  const rootEl = this.getFromEnv('root')
  const config = this.getFromEnv('config')
  const imageList = this.getFromStore('imageList')
  // Iterating over image lists and actually making the dom elements
  const domCollection = imageList.map(imageOb => getListItemImage(imageOb, config))
  // Adding domCollection to store
  this.addToStore('domCollection', domCollection)
  // Append all dom elements to root element
  domCollection.forEach((domOb) => {
    rootEl.appendChild(domOb.container)
  })
  // Initially all elements will be visible
  domCollection.forEach((domOb) => {
    const container = domOb.container
    container.style.display = 'none'
  })
  // Expect for the marked one ;)
  setVisible.call(this, 0)
}

/**
 * Class that will be resonsible for rendering correct
 * image on the gallery based on input data and selection
 */
class Renderer extends Base {
  constructor(parent) {
    super(parent)
    // Getting configuration from env to get
    // the image list
    const config = this.getFromEnv('config')
    const imageArr = (config.src || [])
      .filter((ob => ob &&
          (
            ob.image ||
            ob.text ||
            ob.alt
          )
      ))
    // Add imageList to store
    this.addToStore('imageList', imageArr)
    renderImages.call(this)
  }
  /**
   * Command renderer to set position as given
   */
  setPosition(pos) {
    const domCollection = this.getFromStore('domCollection')
    if (pos >= 0 && pos < domCollection.length) {
      setVisible.call(this, pos)
    }
  }
  /**
   * Command renderer to set next image as current
   */
  next() {
    const currentPos = this.getFromStore('activePosition')
    const domCollection = this.getFromStore('domCollection')
    const nextPos = (currentPos + 1) % domCollection.length
    this.setPosition(nextPos)
  }
  /**
   * Command renderer to set previous image as current
   */
  previous() {
    const currentPos = this.getFromStore('activePosition')
    const domCollection = this.getFromStore('domCollection')
    const nextPos = (currentPos + 1) % domCollection.length
    this.setPosition(nextPos)
  }
}

export default Renderer
