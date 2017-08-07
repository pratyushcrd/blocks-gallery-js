/* Function to immitate free falling style animation */
export default (speed, block, rowIndex, colIndex) => {
  const img = block.img
  const defaultAttrs = {
    y: img.attr('y'),
  }
  const setDefaultAttr = () => {
    img.attr(defaultAttrs)
  }
  const time = 1000 * speed
  const timeout = (60 * colIndex) + (10 * rowIndex)

  return new Promise((resolve) => {
    setTimeout(() => {
      img.animate({
        y: 1000,
      }, time, () => {
        resolve(setDefaultAttr)
      })
    }, timeout)
  })
}
