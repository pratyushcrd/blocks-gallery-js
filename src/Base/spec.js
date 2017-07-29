import Base from './'
console.log(1)
describe('Base Component Test', () => {
  it('should have a constructor that receives env object', () => {
    const envOb = {
      isEnvVariable: true
    }
    const base = new Base(envOb)
    expect(base.environment).to.equal(envOb)
  })
})