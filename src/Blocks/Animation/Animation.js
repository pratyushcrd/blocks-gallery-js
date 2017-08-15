import fall from './fall'
/**
 * A static module for animation collection
 *
 * All animation function function should have this parameter support :
 *
 * function myAnim (speed, block, rowIndex, colIndex) {
 *  const img = block.img
 *  const group = block.group
 *  return new Promise () {
 *    // logic here
 *  }
 * }
 *
 * Animation functions must return a promise and resolve when
 * animation of the particular block is completed
 */
const Animation = {
  /**
   * Function to add animations
   * @param {string} key Animation name
   * @param {Function} animFn Animation function
   */
  add(key, animFn) {
    /* If a property exists, throw error */
    if (this[key]) {
      throw Error('a property with same name exists')
    }
    /* Second parameter must be a function */
    if (typeof animFn !== 'function') {
      throw Error('expected second param to be a function')
    }
    /* Save the animation */
    this[key] = animFn
  },
  /**
   * Get the animation function binded with speed
   * @param {string} key Animation name
   */
  get(key, speed) {
    if (key in ['get', 'add']) {
      throw Error('Not a valid animation name')
    }
    const animFn = this[key] || this.defaultAnim
    /* Make sure speed is valid */
    speed = parseFloat(speed) || 0
    /* Speed cannot be negative */
    if (speed < 0) {
      speed = 0
    }
    /* 'Bind' Hack, not using bind since fat arrow function doesnt support them */
    return (...params) => animFn(speed, ...params)
  },
  /**
   * Default animation function, if animation is not found,
   * default animation will be used
   * @param {Number} speed Relative speed
   * @param {Object} block Block object containing iamge and group
   * @param {Number} rowIndex Row position
   * @param {Number} colIndex Column position
   */
  defaultAnim(speed, block, done) {
    const time = 1000 * speed
    const waitTime = Math.random() * 1000 << 0
    const image = block.img
    const defaultAttrs = {
      opacity: image.attr('opacity'),
    }
      /* Set initial opacity to 1 to start animation */
    image.attr({
      opacity: 1,
    })
    setTimeout(() => {
        /* Animate to opacity 0 */
      image.animate(
          /* Attributes */
        {
          opacity: 0,
        },
        /* Animation duration */
        time,
        /* Callback */
        () => {
          /* Resolve the promise on animation end */
          done()
        },
        )
        /* .animate ends */
    }, waitTime)
      /* setTimeout end */
    return defaultAttrs
  },
}

// Add new animations
Animation.add('fall', fall)

export default Animation
