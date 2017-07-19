/**
 * Function to return first 'non-undefined' value
 * from parameters list
 */
const window = this

const pluck = function (...args) {
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

export default {
  pluck,
  pluckNumber(...args) {
    return +pluck(...args)
  },
  window,
  document: window.document,
}
