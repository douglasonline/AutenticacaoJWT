"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setRedis = exports.getRedis = exports.redisClient = void 0;
const ioredis_1 = __importDefault(require("ioredis"));
const util_1 = require("util");
console.log('Redis URL:', process.env.REDIS_URL);
const redisClient = new ioredis_1.default(process.env.REDIS_URL || 'redis://localhost:6379');
exports.redisClient = redisClient;
function getRedis(value) {
    const syncRedisGet = (0, util_1.promisify)(redisClient.get).bind(redisClient);
    return syncRedisGet(value);
    // redisClient.get("")
}
exports.getRedis = getRedis;
function setRedis(key, value) {
    const syncRedisSet = (0, util_1.promisify)(redisClient.set).bind(redisClient);
    return syncRedisSet(key, value);
    // redisClient.set("","")
}
exports.setRedis = setRedis;
//# sourceMappingURL=redisConfig.js.map