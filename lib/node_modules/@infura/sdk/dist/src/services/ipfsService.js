"use strict";
/*!
 * Copyright(c) ConsenSys Software Inc.
 * Copyright(c) https://consensys.net/
 * MIT Licensed
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable */
var fs_1 = __importDefault(require("fs"));
var ipfs_http_client_1 = require("ipfs-http-client");
var index_1 = require("../lib/Logger/index");
var utils_1 = require("../lib/utils");
var IPFS = /** @class */ (function () {
    function IPFS(_a) {
        var projectId = _a.projectId, apiKeySecret = _a.apiKeySecret;
        if (!projectId) {
            index_1.log.throwArgumentError(index_1.Logger.message.no_infura_projectID_supplied, 'projectId', projectId, {
                location: index_1.Logger.location.IPFSSERVICE_CONSTRUCTOR,
            });
        }
        if (!apiKeySecret) {
            index_1.log.throwArgumentError(index_1.Logger.message.no_infura_projectSecret_supplied, 'apiKeySecret', apiKeySecret, {
                location: index_1.Logger.location.IPFSSERVICE_CONSTRUCTOR,
            });
        }
        this.ipfsClient = (0, ipfs_http_client_1.create)({
            url: 'https://ipfs.infura.io:5001',
            headers: {
                authorization: "Basic ".concat(Buffer.from("".concat(projectId, ":").concat(apiKeySecret)).toString('base64')),
            },
        });
    }
    /** Upload free content data on ipfs
     * @param {string} metadata any string
     * @returns {Promise<string>} Ipfs hash of the stored data
     */
    IPFS.prototype.uploadContent = function (_a) {
        var source = _a.source;
        return __awaiter(this, void 0, void 0, function () {
            var _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _b = "ipfs://".concat;
                        return [4 /*yield*/, this.ipfsClient.add(source)];
                    case 1: return [2 /*return*/, _b.apply("ipfs://", [(_c.sent()).cid.toString()])];
                }
            });
        });
    };
    /** Upload file on ipfs
     * @param {string} metadata path to local file or url
     * @returns {Promise<string>} Ipfs hash of the stored data
     */
    IPFS.prototype.uploadFile = function (_a) {
        var source = _a.source;
        return __awaiter(this, void 0, void 0, function () {
            var inputSrc_1, _b, inputSrc, _c, error_1;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 4, , 5]);
                        if (!(0, utils_1.isURI)(source)) return [3 /*break*/, 2];
                        inputSrc_1 = (0, ipfs_http_client_1.urlSource)(source);
                        _b = "ipfs://".concat;
                        return [4 /*yield*/, this.ipfsClient.add(inputSrc_1)];
                    case 1: return [2 /*return*/, _b.apply("ipfs://", [(_d.sent()).cid.toString()])];
                    case 2:
                        if (!fs_1.default.existsSync(source)) {
                            throw index_1.Logger.message.unexisting_file;
                        }
                        inputSrc = fs_1.default.createReadStream(source);
                        _c = "ipfs://".concat;
                        return [4 /*yield*/, this.ipfsClient.add(inputSrc)];
                    case 3: return [2 /*return*/, _c.apply("ipfs://", [(_d.sent()).cid.toString()])];
                    case 4:
                        error_1 = _d.sent();
                        return [2 /*return*/, index_1.log.throwArgumentError(index_1.Logger.message.an_error_occured_with_ipfs_api, 'file', source, {
                                location: index_1.Logger.location.IPFSSERVICE_UPLOADFILE,
                                error: "".concat(error_1),
                            })];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    /** upload array of metadata on ipfs
     * @param {Array<any>} metadata an array of valid JSON Metadata
     * @returns {Promise<string>} Ipfs hash of the stored data
     */
    IPFS.prototype.uploadArray = function (_a) {
        var _b, e_1, _c, _d;
        var sources = _a.sources, _e = _a.isErc1155, isErc1155 = _e === void 0 ? false : _e;
        return __awaiter(this, void 0, void 0, function () {
            var uploadedDirectory, files, _f, _g, _h, file, e_1_1, item, error_2;
            return __generator(this, function (_j) {
                switch (_j.label) {
                    case 0:
                        if (sources.length <= 0) {
                            return [2 /*return*/, index_1.log.throwArgumentError(index_1.Logger.message.array_should_not_be_empty, 'sources', sources, {
                                    location: index_1.Logger.location.IPFSSERVICE_UPLOADDIRECTORY,
                                })];
                        }
                        _j.label = 1;
                    case 1:
                        _j.trys.push([1, 14, , 15]);
                        uploadedDirectory = [];
                        files = sources.map(function (source, index) {
                            return {
                                path: isErc1155 ? "".concat(index, ".json") : "".concat(index),
                                content: source,
                            };
                        });
                        _j.label = 2;
                    case 2:
                        _j.trys.push([2, 7, 8, 13]);
                        _f = true, _g = __asyncValues(this.ipfsClient.addAll(files, {
                            wrapWithDirectory: true,
                        }));
                        _j.label = 3;
                    case 3: return [4 /*yield*/, _g.next()];
                    case 4:
                        if (!(_h = _j.sent(), _b = _h.done, !_b)) return [3 /*break*/, 6];
                        _d = _h.value;
                        _f = false;
                        try {
                            file = _d;
                            uploadedDirectory.push(file);
                        }
                        finally {
                            _f = true;
                        }
                        _j.label = 5;
                    case 5: return [3 /*break*/, 3];
                    case 6: return [3 /*break*/, 13];
                    case 7:
                        e_1_1 = _j.sent();
                        e_1 = { error: e_1_1 };
                        return [3 /*break*/, 13];
                    case 8:
                        _j.trys.push([8, , 11, 12]);
                        if (!(!_f && !_b && (_c = _g.return))) return [3 /*break*/, 10];
                        return [4 /*yield*/, _c.call(_g)];
                    case 9:
                        _j.sent();
                        _j.label = 10;
                    case 10: return [3 /*break*/, 12];
                    case 11:
                        if (e_1) throw e_1.error;
                        return [7 /*endfinally*/];
                    case 12: return [7 /*endfinally*/];
                    case 13:
                        item = __spreadArray([], uploadedDirectory, true).pop();
                        return [2 /*return*/, "ipfs://".concat(item === null || item === void 0 ? void 0 : item.cid.toString(), "/")];
                    case 14:
                        error_2 = _j.sent();
                        return [2 /*return*/, index_1.log.throwError(index_1.Logger.message.an_error_occured_with_ipfs_api, index_1.Logger.code.IPFS, {
                                location: index_1.Logger.location.IPFSSERVICE_UPLOADDIRECTORY,
                                error: error_2,
                            })];
                    case 15: return [2 /*return*/];
                }
            });
        });
    };
    IPFS.prototype.unPinFile = function (_a) {
        var hash = _a.hash;
        return __awaiter(this, void 0, void 0, function () {
            var error_3;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.ipfsClient.pin.rm(hash)];
                    case 1: return [2 /*return*/, _b.sent()];
                    case 2:
                        error_3 = _b.sent();
                        return [2 /*return*/, index_1.log.throwError(index_1.Logger.message.an_error_occured_with_ipfs_api, index_1.Logger.code.IPFS, {
                                location: index_1.Logger.location.IPFSSERVICE_UNPINFILE,
                                error: error_3,
                            })];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    IPFS.prototype.closeConnection = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.ipfsClient.stop();
                return [2 /*return*/];
            });
        });
    };
    return IPFS;
}());
exports.default = IPFS;
//# sourceMappingURL=ipfsService.js.map