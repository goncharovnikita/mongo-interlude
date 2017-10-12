// CLEAR DB MODULE TEST

import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
const should             = chai.should();
const { assert, expect } = chai;
import { stub }          from 'sinon';
import { clearDb }       from './clear_db';

chai.use(chaiAsPromised);
describe('clearDb tests', () => {
  it('should get clearDb func', done => {
    expect(clearDb).to.be.a('function');
    done();
  });

  it('should remove all collections from mongo by mongoose', async () => {
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
    };

    Object.keys(fakeMongoose.connection.collections).forEach(key => {
      const fakeModel  = fakeMongoose.connection.collections[key];
      fakeModel.remove = () => {};
      stub(fakeModel, 'remove').callsFake((o) => {
        if (typeof o !== 'object') throw new Error('Remove should get object to input!');

        return true;
      });
    });

    const result = await clearDb({ mongoose: fakeMongoose, silent: true });
    expect(result).to.be.a('object');
    expect(result.success).to.be.an('array');
    expect(result.errors).to.be.an('array');
  });

  it ('clearDb({}) throws Error: Mongoose adapter is undefined!', async () => {
    try {
      const result = await clearDb({});
      expect(result).to.be.equal(null);
    } catch (e) {
      expect(e).to.be.an('error')
        .with.property('message')
        .equal('Mongoose adapter is undefined!');
    }
  });

});