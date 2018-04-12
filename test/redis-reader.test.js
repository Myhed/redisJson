const chai = require('chai');
const proxyquire = require('proxyquire');
const Redis = require('ioredis');
const sinon = require('sinon');
const {expect} = chai;

describe('RedisReader',() => {
    let RedisReader;
    let RedisStub;
    before(() => {
        RedisStub = class {
            constructor(){
                return sinon.createStubInstance(Redis);
            }
        }
        RedisReader = proxyquire('../lib/redis-reader',{
            'ioredis': RedisStub,
        });
    });
    it('should be a class',() => {
        expect(RedisReader).to.be.a('function');
        expect(RedisReader).to.have.property('prototype');
    });
    it('should have 2 methods importRedis,exportRedis',() => {
        expect(RedisReader).to.respondTo('importRedis');
        expect(RedisReader).to.respondTo('exportRedis');
    });
    describe('instance',() => {
        let redisReader;
        before(() => {
            redisReader = new RedisReader();
        });
        describe('stop()', () => {
            it('should stop redis server',async () => {
                redisReader.redis.quit.withArgs().resolves();
                await redisReader.stop();
                expect(redisReader.redis.quit.called).to.be.true;
            });
        });
        describe('importRedis()',() => {
            let insertRedisType;
            it('should import type string in redis',() => {
                //data
                 insertRedisType = {
                    clientRedisType:redisReader.redis.set,
                    data:{
                        key:"membre",
                        description:"hello je m'appelle Myhed"
                    }
                }
                //fake data
                redisReader.redis.set.withArgs(insertRedisType.data.key,insertRedisType.data.description);
                //test
                redisReader.importRedis(insertRedisType);
                expect(redisReader.redis.set.calledWithExactly(insertRedisType.data.key,ParamsOfRedisType.data.description)).to.be.true

            });
            it('should import type hash in redis',() => {
                 insertRedisType = {
                    clientRedisType:redisReader.redis.hset,
                    data:{
                        key:"myhash",
                        field:"name",
                        description:"Myhed",
                    }
                }
                //fake data
                redisReader.redis.hset.withArgs(insertRedisType.data.key,insertRedisType.data.field,insertRedisType.data.description);
                //test
                redisReader.importRedis(insertRedisType);
                expect(redisReader.redis.hset.calledWithExactly(insertRedisType.data.key,insertRedisType.data.field,insertRedisType.data.description)).to.be.true
            });
        });
    });
});