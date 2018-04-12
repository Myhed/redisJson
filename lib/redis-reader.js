const Redis = require('ioredis');
const _ = require('lodash');
class RedisReader {
    constructor(){
        this.redis = new Redis();
    }
    importRedis(params = {}) {
        const getParams = _.valuesIn(params.data);
        console.log('getParams',getParams)
        params.clientRedisType(...getParams);
    }
    exportRedis(){

    }
    async stop(){
        this.redis.quit();
    }
}

module.exports = RedisReader;