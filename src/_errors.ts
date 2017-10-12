// CUSTOM ERRORS

export function InvalidOptionsError(property) {
    Error.call(this, property) ;
    this.name = "InvalidOptionsError";
  
    this.property = property;
    this.message = "clearDb require " + property + " to proceed."
  
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, InvalidOptionsError);
    } else {
      this.stack = (new Error()).stack;
    }
  
  }
  
  InvalidOptionsError.prototype = Object.create(Error.prototype);
  