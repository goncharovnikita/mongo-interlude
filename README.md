# Mongo-Interlude
[![Build Status](https://travis-ci.org/GoncharovNikita/mongo-interlude.svg?branch=master)](https://travis-ci.org/GoncharovNikita/mongo-interlude)

Lightweight npm package to provide cleaning operations with mongodb easily.

> Core purpose of **mongo-interlude**
> is to help developers clean-up models in mongodb after
or even before tests, to avoid **Errors**

For now, can be installed with npm:

```sh
$ npm install mongo-interlude
```
... and for dev dependency:

```sh
$ npm install -D mongo-interlude
```

### Usage

For now available ```clearDb ``` module, which removes all data from all your models. Require ```mongoose ``` adapter.
```javascript
// require main module
const mongoInterlude = require('mongo-interlude')

// require clearDb function
// notice that clearDb returns Promise
const clearDb = mongoInterlude.clearDb

...
// e.g. you have after tests function:
after(async () => {
    await clearDb({ mongoose: yourMongooseAdapter, silent: true })
})
...
```

### Params 
- `mongoose` - your mongoose adapter
- `silent` - off logging 
- `whitelist` - array of model names, which will stay untouched

### Return 

```clearDb ``` also return `Object`, which contains `Success` and `Errors` Arrays:
```javascript
...
const result = await clearDb({ mongoose: yourMongooseAdapter })
console.log(result)
/*
success: [...], <- contains names of successfully cleared models
errors: [...] <- contains objects with key of failed model and value of error
*/
...
```
