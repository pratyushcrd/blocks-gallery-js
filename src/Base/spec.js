import Base from './'
describe('Base Component Test', () => {
  const envOb = {
    isEnvVariable: true
  }
  const base = new Base(envOb)
  it('should have a constructor that receives env object', () => {
    expect(base.environment).to.equal(envOb)
  })

  it('should have methods addToEnv and getFromEnv', () => {
    expect(base.addToEnv).to.be.a('function')
  })
})