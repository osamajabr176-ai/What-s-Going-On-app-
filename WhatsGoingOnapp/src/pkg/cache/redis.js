import Redis from 'ioredis'

export class RedisCacheProvider {

    client;

    constructor(config) {
        this.client = new Redis({
            host: config.host,
            port: config.port,
            password: config.password,
            lazyConnect: true,
            maxLoadingRetryTime:3
        });
        this.client.on('error', (err) => console.log(" redis server Error",err.message));
        this.client.connect().catch(err => console.log("fail to connect to redis",err.message));
    }

    async set(key, value,ttl) {
        return this.client.set(key, value,"EX", ttl);
    }
    async get(key){
        return this.client.get(key);
    }
    async del(key){
        return this.client.del(key);
    }
    async ttl(key){
        return this.client.ttl(key);
    }
}

// new RedisCacheProvider({
//     host: '127.0.0.1',
//     port: 6379,
//     password:""
// });