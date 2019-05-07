var Redis = require('ioredis');
let redis = new Redis();
module.exports = {
    hset: (hash, key, value) => {
        return new Promise((resolve, reject) => {
            if (!hash || !key || !value) {
                return Promise.resolve({});
            }
            console.log("setting to redis");
            redis.hset(hash, key, JSON.stringify(value)).then(resolve).catch(resolve);
        })
    },
    hdel: (hash, key) => {
        return new Promise((resolve, reject) => {
            if (!hash || !key) {
                return Promise.resolve({});
            }
            redis.hdel(hash, key).then(resolve).catch(resolve);
        })
    },
    hget: (hash, key) => {
        return new Promise((resolve, reject) => {
            if (!hash || !key) {
                return Promise.resolve({});
            }
            console.log("fetching from redis");
            redis.hget(hash, key).then((value) => {
                console.log("fetching from redis ",value);
                if (!!value) {
                    resolve(JSON.parse(value))
                } else {
                    reject({})
                }
            }).catch(reject);
        })
    },
}