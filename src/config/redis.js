const redis = require('redis');
const logger = require('./logger');

const client = redis.createClient({
  url: `redis://${process.env.REDIS_HOST || 'localhost'}:${process.env.REDIS_PORT || 6379}`
});

client.on('error', (err) => logger.error('Redis Client Error', err));

(async () => {
  try {
    await client.connect();
    logger.info('Connected to Redis');
  } catch (err) {
    logger.error('Failed to connect to Redis', err);
  }
})();

module.exports = client;
