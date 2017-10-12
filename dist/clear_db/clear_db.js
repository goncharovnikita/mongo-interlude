"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var _errors_1 = require("../_errors");
var Whitelist = require("./whitelist");
var whitelist = Whitelist['whitelist'];
exports.clearDb = function (opts) { return __awaiter(_this, void 0, void 0, function () {
    function clearByMongoose(mongoose) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var success, errors;
            return __generator(this, function (_a) {
                success = new Array();
                errors = new Array();
                Object.keys(mongoose.connection.collections).forEach(function (key) { return __awaiter(_this, void 0, void 0, function () {
                    var model, e_1;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                model = mongoose.connection.collections[key];
                                if (whitelist.indexOf(key) !== -1)
                                    return [2];
                                _a.label = 1;
                            case 1:
                                _a.trys.push([1, 3, , 4]);
                                return [4, model.remove({})];
                            case 2:
                                _a.sent();
                                success.push(key);
                                if (!silent)
                                    console.log('Model ' + key + ' successfully cleared!');
                                return [3, 4];
                            case 3:
                                e_1 = _a.sent();
                                errors.push(new Error(e_1));
                                if (!silent)
                                    console.log('Error occured on model ' + key);
                                return [3, 4];
                            case 4: return [2];
                        }
                    });
                }); });
                console.log('All models successfully cleared!');
                return [2, {
                        success: success,
                        errors: errors
                    }];
            });
        });
    }
    var _a, silent, mongoose, RESULT, CLEAR_BY, ERROR, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                if (typeof opts !== 'object' || !opts)
                    throw new _errors_1.InvalidOptionsError('options object');
                _a = opts.silent, silent = _a === void 0 ? false : _a, mongoose = opts.mongoose;
                CLEAR_BY = null;
                ERROR = null;
                if (mongoose)
                    CLEAR_BY = "mongoose";
                _b = CLEAR_BY;
                switch (_b) {
                    case 'mongoose': return [3, 1];
                    case null: return [3, 3];
                }
                return [3, 4];
            case 1: return [4, clearByMongoose(mongoose)];
            case 2:
                RESULT = _c.sent();
                return [3, 4];
            case 3:
                ERROR = new Error('Mongoose adapter is undefined!');
                throw ERROR;
            case 4: return [2, RESULT];
        }
    });
}); };
//# sourceMappingURL=clear_db.js.map