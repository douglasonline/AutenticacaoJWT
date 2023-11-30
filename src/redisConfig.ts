import Redis from "ioredis";
import { promisify } from "util";

console.log('Redis URL:', process.env.REDIS_URL);
const redisClient = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');

function getRedis(value: string){

    const syncRedisGet = promisify(redisClient.get).bind(redisClient);
    return syncRedisGet(value);

    // redisClient.get("")

}

function setRedis(key: string,  value: string){

    const syncRedisSet = promisify(redisClient.set).bind(redisClient);
    return syncRedisSet(key, value);

    // redisClient.set("","")

}

export {redisClient, getRedis, setRedis};