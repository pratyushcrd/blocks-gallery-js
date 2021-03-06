function getParent() {
  return this.getFromStore('parent')
}
function setEnv(parent, baseClass) {
  // Checking if env object is sent instead of parent
  if (parent.isEnvVariable) {
    this.environment = parent
  } else {
    // Every component must call super with their parent
    // which is supposed to be instance of Base
    if (!(this instanceof baseClass)) {
      throw Error('Make sure first parameter is the parent component which is an instance of Base component')
    }
    this.environment = parent.environment
    this.addToStore('parent', parent)
    this.getParent = getParent
  }
}

/**
 * Function that can get complex attributes from
 * object, e.g 'abc.xyz.ijk'
 * @param {Object} ob Object to find the result
 * @param {string} key complex or simple string attribute
 */
function deepGet(ob, key) {
  let result = ob
  // Split key by '.' delimeter
  key.split('.').forEach((attr) => {
    result = result[attr]
  })
  return result
}
/**
 * Function to get props from binded object
 * @return if one prop is send that prop value is return otherwise
 * object is returned having all requested keys
 * @param {String} keys key of property to get it
 */
function getter(ob, keys) {
  let result
  if (keys.length === 1) {
    result = deepGet(ob, keys[0])
  } else {
    result = {}
    keys.forEach((key) => {
      result[key] = deepGet(ob, key)
    })
  }
  return result
}
/**
 * A class that will be base class for all other components
 * so initialize states and add basic functionalities
 */
module.exports = class Base {
  constructor(parent) {
    this.state = {}
    this.store = {}
    this.props = {}
    setEnv.call(this, parent, Base)
  }
  /* Setter for store */
  addToStore(key, val) {
    this.store[key] = val
    return val
  }
  /* Getter for store */
  getFromStore(...keys) {
    return getter(this.store, keys)
  }
  /* Setter for state */
  setState(key, val) {
    this.state[key] = val
    return val
  }
  /* Getter for state */
  getState(...keys) {
    return getter(this.state, keys)
  }
  /* Setter for props */
  setProps(key, val) {
    this.props[key] = val
    return val
  }
  /* Getter for props */
  getProps(...keys) {
    return getter(this.props, keys)
  }
  /** Get from common environment */
  getFromEnv(...keys) {
    return getter(this.environment, keys)
  }
  /* Add to environment */
  addToEnv(key, val) {
    this.environment[key] = val
    return val
  }
}
