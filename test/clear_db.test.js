// CLEAR DB MODULE TEST

const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
chai.use(chaiAsPromised)
const { assert, expect } = chai
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
    expect(result).to.be.a('object')
    expect(result.success).to.be.an('array')
    expect(result.errors).to.be.an('array')
  })

  it ('should throw an no options object Error', async () => {
    const { clearDb } = require('../index')()
    try {
      await clearDb()
    } catch(e) {
      expect(e).to.not.be.equal(null)
      expect(e).to.be.an('error')
    }
  })

  it ('should throw no mongoose error', async () => {
    const { clearDb } = require('../index')()
    try {
      clearDb({})
    } catch (e) {
      expect(e).to.not.be.equal(null)
      expect(e).to.be.an('error')
    }
  })
}
