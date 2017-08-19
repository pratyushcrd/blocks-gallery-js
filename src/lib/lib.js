/**
 * Function to return first 'non-undefined' value
 * from parameters list
 */
const pluck = (...args) => {
  let i = 0
  let item
  let result

  const ii = args.length

  for (; i < ii; i += 1) {
    item = args[i]
    if (item !== undefined) {
      result = item
    }
  }
  return result
}

module.exports = {
  pluck,
  pluckNumber(...args) {
    return +pluck(...args)
  },
  blankFn: () => {},
}
