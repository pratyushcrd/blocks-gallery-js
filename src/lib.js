/**
 * Function to return first 'non-undefined' value
 * from parameters list
 */
const pluck = function () {
    let i = 0,
      ii = arguments.length,
      item;
    for (; i < ii; ++i) {
      item = arguments[i];
      if (item !== undefined) {
        return item;
      }
    }
  }

export default {
  pluck: pluck,
  pluckNumber: function () {
    return +pluck.apply(null, arguments)
  }
}