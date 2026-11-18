# Scalable REST API (Node.js & Express)

A simple, fast, and scalable REST API boilerplate built with Node.js, Express, and Redis for caching.

## Features

- **Caching**: Automated response caching with **Redis** to minimize database load and latency.
- **Logging**: High-performance structured logging using **Pino**.
- **Architecture**: Organized into Controllers, Services, and Routes for better maintainability.
- **Error Handling**: Centralized global error handling middleware.
- **Health Checks**: `/health` endpoint for uptime monitoring.

## Prerequisites

- Node.js (v14+)
- Redis Server (running on localhost:6379, or configure via `.env`)

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Configure environment variables**:
   Create a `.env` file (copied from `.env.example` if available):
   ```env
   PORT=3000
   REDIS_HOST=localhost
   REDIS_PORT=6379
   NODE_ENV=development
   ```

3. **Run the application**:
   - For production: `npm start`
   - For development: `npm run dev`

## API Endpoints

### Health Check
- **URL**: `GET /health`
- **Description**: Returns the status of the API.
- **Example Response**:
  ```json
  {
    "status": "OK",
    "timestamp": "2026-04-07T02:30:09.874Z"
  }
  ```

### Products
- **URL**: `GET /api/v1/products`
- **Description**: Returns a list of products. The first call fetches from the source, and subsequent calls (within 60s) are served from the **Redis cache**.
- **Example Response**:
  ```json
  [
    { "id": 1, "name": "Laptop", "price": 1200 },
    { "id": 2, "name": "Smartphone", "price": 800 }
  ]
  ```

## Project Structure

```text
rest-api/
├── src/
│   ├── config/       # Redis and Logger configuration
│   ├── controllers/  # Request handlers
│   ├── middleware/   # Custom Express middleware
│   ├── routes/       # API route definitions
│   ├── services/     # Business logic and data services
│   └── server.js     # Entry point
├── .env              # Environment variables
├── .gitignore        # Git ignore rules
└── package.json      # Node.js dependencies and scripts
```


## Further reading

Longer write-ups on the same ground, from [hisandeep.com](https://www.hisandeep.com):

- [When a hot Redis key expires: cache stampedes](https://www.hisandeep.com/blog/redis-cache-stampede)
- [Shrinking a 14 GiB Redis cache to 1.6 GiB, no downtime](https://www.hisandeep.com/blog/redis-cache-compression-9x)
- [Structuring an Express API that outlives sprint one](https://www.hisandeep.com/blog/express-api-structure-that-lasts)
