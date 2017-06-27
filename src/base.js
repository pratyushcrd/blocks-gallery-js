/**
 * A class that will be base class for all other components
 * so initialize states and add basic functionalities
 */
export default class Base {
  constructor () {
    this.state = {};
    this.store = {};
    this.props = {};
  }
  /* Setter for store */
  addToStore (key, val) {
    this.store[key] = val
  }
  /* Getter for store */
  getFromStore (key) {
    return this.store[key]
  }
  /* Setter for state */
  setState (key, val) {
    this.state[key] = val
  }
  /* Getter for state */
  getState (key) {
    return this.state[key]
  }
  /* Setter for props */
  setProps (key, val) {
    this.props[key] = val
  }
  /* Getter for props */
  getProps (key) {
    returnthis.props[key]
  }
}