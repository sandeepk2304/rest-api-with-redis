const express = require('express');
const logger = require('./config/logger');
const errorHandler = require('./middleware/errorHandler');
const healthRoutes = require('./routes/health');
const productRoutes = require('./routes/products');

const app = express();

app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
  logger.info({ method: req.method, url: req.url }, 'Incoming request');
  next();
});

// Routes
app.use('/health', healthRoutes);
app.use('/api/v1/products', productRoutes);

// Error handling
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});
