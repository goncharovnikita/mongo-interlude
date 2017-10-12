"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function InvalidOptionsError(property) {
    Error.call(this, property);
    this.name = "InvalidOptionsError";
    this.property = property;
    this.message = "clearDb require " + property + " to proceed.";
    if (Error.captureStackTrace) {
        Error.captureStackTrace(this, InvalidOptionsError);
    }
    else {
        this.stack = (new Error()).stack;
    }
}
exports.InvalidOptionsError = InvalidOptionsError;
InvalidOptionsError.prototype = Object.create(Error.prototype);
//# sourceMappingURL=_errors.js.map