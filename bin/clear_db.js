// CLEAR DB MODULE

module.exports = async ({ silent = false, mongoose = null }) => {

  let RESULT    =  ""
  let CLEAR_BY  =  ""
  if (mongoose) CLEAR_BY = "mongoose"

  const clearByMongoose = async (mongoose) => {
    const result = []

    Object.keys(mongoose.connection.collections).forEach( async (key) => {
      const model = mongoose.connection.collections[key]
      if (model.name === 'identitycounters') return
      await model.remove({})
      result.push('Model ' + key + ' successfully dropped!')
    })

    return result
  }

  switch(CLEAR_BY) {
    case 'mongoose': RESULT = await clearByMongoose(mongoose); break
  }

  
  return RESULT.join(/\n/)

}
