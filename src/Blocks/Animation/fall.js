/* Function to immitate free falling style animation */
export default (speed, block, done, rowIndex, colIndex) => {
  const img = block.img
  const defaultAttrs = {
    y: img.attr('y') || 0,
  }
  const time = 1000 * speed
  const timeout = (60 * colIndex) + (10 * rowIndex)

  setTimeout(() => {
    img.animate({
      y: 1000,
    }, time, done)
  }, timeout)

  /* Return default attrs */
  return defaultAttrs
}
