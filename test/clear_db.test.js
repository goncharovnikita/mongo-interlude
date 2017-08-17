// CLEAR DB MODULE TEST

const { expect, assert } = require('chai')
const { stub }   = require('sinon')

module.exports = () => {
  it('should get clearDb func', done => {
    const { clearDb } = require('../index')()
    expect(clearDb).to.be.a('function')
    done()
  })

  it('should remove all collections from mongo by mongoose', async () => {
    const { clearDb } = require('../index')()
    const fakeMongoose = {
      connection: {
        collections: {
          'identitycounters': {
            name: 'identitycounters'
          },
          'someModel': {
            name: 'someModel'
          }
        }
      }
    }

    Object.keys(fakeMongoose.connection.collections).forEach(key => {
      const fakeModel  = fakeMongoose.connection.collections[key]
      fakeModel.remove = () => {}
      stub(fakeModel, 'remove').callsFake((o) => {
        if (typeof o !== 'object') throw new Error('Remove should get object to input!')
        return true
      })
    })

    const result = await clearDb({ mongoose: fakeMongoose })
    expect(result).to.be.a('string')
    assert.equal('Model someModel successfully dropped!', result)
  })
}
