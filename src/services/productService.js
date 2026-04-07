// Mock data for demonstration
const products = [
  { id: 1, name: 'Laptop', price: 1200 },
  { id: 2, name: 'Smartphone', price: 800 },
  { id: 3, name: 'Tablet', price: 500 }
];

const redisClient = require('../config/redis');
const logger = require('../config/logger');

const getProducts = async () => {
  const cacheKey = 'products:all';
  
  try {
    const cachedData = await redisClient.get(cacheKey);
    if (cachedData) {
      logger.info('Returning cached products');
      return JSON.parse(cachedData);
    }

    // Simulate DB fetch
    logger.info('Fetching products from mock DB');
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate delay
    
    // Cache the result for 60 seconds
    await redisClient.set(cacheKey, JSON.stringify(products), {
      EX: 60
    });

    return products;
  } catch (err) {
    logger.error('Error in productService.getProducts', err);
    return products; // Fallback to mock data if Redis fails
  }
};

module.exports = { getProducts };
