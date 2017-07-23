function getParent() {
  return this.getFromStore('parent')
}
function setEnv(parent, baseClass) {
  // Checking if env object is sent instead of parent
  if (parent.isEnvVariable) {
    this.environmment = parent
  } else {
    // Every component must call super with their parent
    // which is supposed to be instance of Base
    if (!(this instanceof baseClass)) {
      throw Error('Make sure first parameter is the parent component which is an instance of Base component')
    }
    this.environmment = parent.environmment
    this.addToStore('parent', parent)
    this.getParent = getParent
  }
}
/**
 * A class that will be base class for all other components
 * so initialize states and add basic functionalities
 */
export default class Base {
  constructor(parent) {
    this.state = {}
    this.store = {}
    this.props = {}
    setEnv.call(this, parent, Base)
  }
  /* Setter for store */
  addToStore(key, val) {
    this.store[key] = val
  }
  /* Getter for store */
  getFromStore(key) {
    return this.store[key]
  }
  /* Setter for state */
  setState(key, val) {
    this.state[key] = val
  }
  /* Getter for state */
  getState(key) {
    return this.state[key]
  }
  /* Setter for props */
  setProps(key, val) {
    this.props[key] = val
  }
  /* Getter for props */
  getProps(key) {
    return this.props[key]
  }
  /** Get from common environment */
  getFromEnv(key) {
    return this.environmment[key]
  }
  /* Add to environment */
  addToEnv(key, val) {
    this.environmment[key] = val
  }
}
