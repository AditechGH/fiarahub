import { createClient, RedisClient } from 'redis';
import constants from "./constants";
import logger from "./logger";

export default class Cache {

    public client: RedisClient;

    constructor() {
        this.client  = createClient(constants.REDIS_PORT, constants.REDIS_HOST);
        this.client.on('connect', this.connected);
        this.client.on('error', this.error);
    }

    private connected() {
        logger.info(`Successfully connected to Redis on: ${constants.REDIS_HOST}:${constants.REDIS_PORT}`);
    }

    private error(error: any) {
        logger.error(`Error in Redis client: ${error.message}`, error);
    }
}
