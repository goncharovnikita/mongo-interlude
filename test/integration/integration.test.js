import root from '../../index';
import { expect }  from 'chai';

const { clearDb } = root 
describe('integration test', () => {
    it ('should propertly import clearDb', () => {
        expect(clearDb).to.be.a('function');
    })
})