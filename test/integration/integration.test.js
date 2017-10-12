import { clearDb } from '../../index';
import { expect }  from 'chai';

describe('integration test', () => {
    it ('should propertly import clearDb', () => {
        expect(clearDb).to.be.a('function');
    })
})