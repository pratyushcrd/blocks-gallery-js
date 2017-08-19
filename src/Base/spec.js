const Base = require('./')
describe('Base Component Test', () => {
  const envOb = {
    isEnvVariable: true
  }
  const base = new Base(envOb)
  const child = new Base(base)
  
  it('should have a constructor that receives env object', () => {
    expect(base.environment).to.equal(envOb)
  })

  it('should have methods addToEnv and getFromEnv', () => {
    expect(base.addToEnv).to.be.a('function')
  })

  it('should share same enviroment bwtween parent and child', () => {
    expect(base.environment).to.equal(child.environment)
  })

  it('should have a different store for base and child', () => {
    base.addToStore('x', 1)
    expect(child.getFromStore('x')).to.equal(undefined)
  })
})
