import { pluck } from '../lib/lib'
import Base from '../Base/Base'
/**
 * Function to create list item of gallery
 * based on provided object
 * @param {Object} object Info for current element
 * @param {Object} config Global config
 */
function getListItemImage(object, config, paper) {
  const group = paper.group()
  const image = paper.image(object.image, 0, 0, config.width, config.height)
  const text = paper.text(0,
    0,
    pluck(object.text, ''),
  )
  // Add elements to group
  group.add(image)
  group.add(text)
  // Return all the elements
  return {
    group,
    image,
    text,
    imageSrc: object.image,
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
    domCollection[pos].group.show()
    // Make previous position hidden
    // check since in first time currentActivePos
    // is undefined
    if (domCollection[currentActivePos]) {
      domCollection[currentActivePos].group.hide()
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
  const paper = this.getFromEnv('paper')
  const group = this.getFromStore('rendererGroup')
  const config = this.getFromEnv('config')
  const imageList = this.getFromStore('imageList')
  // Iterating over image lists and actually making the dom elements
  const domCollection = imageList.map(imageOb => getListItemImage(imageOb, config, paper))
  // Adding domCollection to store
  this.addToStore('domCollection', domCollection)
  // Initially all elements will be invisible
  domCollection.forEach((domOb) => {
    // Also add all elements to main group
    group.add(domOb.group)
  })
  // 0th image will be visible at first
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
    const paper = this.getFromEnv('paper')
    // create and add group to store
    this.addToStore('rendererGroup',
      paper
      .group()
      .attr({
        id: 'blocks-gallery-renderer',
      }),
    )
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
    const nextPos = (currentPos - 1) % domCollection.length
    this.setPosition(nextPos)
  }

  getCurrent() {
    const currentActivePos = this.getFromStore('activePosition')
    const domCollection = this.getFromStore('domCollection')
    return domCollection[currentActivePos]
  }
}

export default Renderer
