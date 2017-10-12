// CLEAR DB MODULE

import { InvalidOptionsError } from '../_errors';
import Whitelist from './whitelist';
const wl = Whitelist['whitelist'];

interface ClearResult {
  success: Array<String>;
  errors: Array<Error>;
}

export const clearDb = async (opts) => {

  const silentTimeout = 5000;
  if (typeof opts !== 'object' || !opts) throw new InvalidOptionsError('options object');
  const { silent = false, mongoose, whitelist } = opts;

  if (whitelist) {
    wl.concat(whitelist);
  }

  let RESULT: ClearResult;
  let CLEAR_BY  =  null;
  let ERROR     =  null;

  if (mongoose) CLEAR_BY = "mongoose";

  async function clearByMongoose(mongoose): Promise<ClearResult> {
    const success = new Array<String>();
    const errors  = new Array<Error>();

    Object.keys(mongoose.connection.collections).forEach( async (key) => {
      const model = mongoose.connection.collections[key];
      if (wl.indexOf(key) !== -1) return;
      try {
        await model.remove({});
        success.push(key);
        if (!silent) console.log('Model ' + key + ' successfully cleared!');
      } catch (e) {
        errors.push(new Error(e));
        if (!silent) console.log('Error occured on model ' + key);
      }
    });

    if (!silent) console.log('All models successfully cleared!');

    return {
      success,
      errors
    };
  }

  switch(CLEAR_BY) {
    case 'mongoose': RESULT = await clearByMongoose(mongoose); break;
    case null: ERROR        = new Error('Mongoose adapter is undefined!'); throw ERROR;
  }


  return RESULT;

};

