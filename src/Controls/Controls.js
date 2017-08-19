import Base from '../Base/Base'
import defs from '../defs/defs'

/* Get default configurations for controls */
const defsControl = defs.controls
const barCommonAttrs = defsControl.attrs

function barEventListeners (bar, callback) {
  /* Make bar invisible at start */
  bar.attr({
    opacity: 0.01,
  })
  bar.mousemove(() => {
    /* Get back visibility on bar */
    bar.attr({
      opacity: 1,
    })
  })
  bar.mouseout(() => {
    /* Remove visibility from bar */
    bar.attr({
      opacity: 0.01,
    })
  })
  bar.mousedown(callback)
}

function getBar(x, y, width, height, callback) {
  const paper = this.getFromEnv('paper')
  const group = this.getFromStore('controlsGroup')
  /* Create control bars */
  const rect = paper
    .rect(x, y, width, height)
    .attr(barCommonAttrs)
  /* Add rect to controls group */
  group.add(rect)
  /* Add event Listeners to bar */
  barEventListeners(rect, callback)
  return rect
}

function getLeftBar() {
  const galleryConfig = this.getFromEnv('config')
  const config = this.getFromStore('controlsConfig')
  const width = config.width || defsControl.width
  const parent = this.getFromStore('parent')
  const callback = parent.previous.bind(parent)

  return getBar.call(this, 0, 0, width, galleryConfig.height, callback)
}

function getRightBar() {
  const galleryConfig = this.getFromEnv('config')
  const config = this.getFromStore('controlsConfig')
  const width = config.width || defsControl.width
  const galleryWidth = galleryConfig.width
  const parent = this.getFromStore('parent')
  const callback = parent.next.bind(parent)

  return getBar.call(this, galleryWidth - width, 0, width, galleryConfig.height, callback)
}

/**
 * Left and Right controllers for gallery
 * Uses `Base` as the parent class
 */
class Controls extends Base {
  /**
   * Initialize controls
   * @param {Base} parent Parent class that invokes Controls
   */
  constructor(parent) {
    super(parent)

    const paper = this.getFromEnv('paper')
    const config = this.getFromEnv('config')
    const controlsConfig = config.controls || {}

    /* Add controls config to store */
    this.addToStore('controlsConfig', controlsConfig)
    /* Add a group to store */
    this.addToStore('controlsGroup', paper.group())
    /* Add the left handler */
    this.addToStore('leftBar', getLeftBar.call(this))
    /* Add the right handler */
    this.addToStore('rightBar', getRightBar.call(this))
  }
}

export default Controls
