const express = require('express');
const os = require('os');
const healthRouter = require('./routes/health');
const rootRouter = require('./routes/root');

const database = require('./config/database');
const ColorRepository = require('./repositories/ColorRepository');
const ColorService = require('./services/ColorService');
const ColorController = require('./controllers/ColorController');
const createColorRoutes = require('./routes/colorRoutes');
const errorHandler = require('./middleware/errorHandler');

function createApp() {
  const app = express();

  // Middleware
  app.use(express.json());

  // Setup health checks
  app.use('/', healthRouter);
  app.use('/', rootRouter);

  return app;
}

// Initialize database and start server
async function startServer() {
  const app = createApp();
  const port = process.env.PORT || 80;

  try {

    // Connect to database
    await database.connect();

    // Initialize repository
    const colorRepository = new ColorRepository(database);
    await colorRepository.ensureIndexes();

    // Initialize service
    const colorService = new ColorService(colorRepository);

    // Initialize controller
    const colorController = new ColorController(colorService);

    // Setup API routes
    const colorRoutes = createColorRoutes(colorController);
    app.use('/api', colorRoutes);

    // Error handling middleware
    app.use(errorHandler);

    // Start listening
    const server = app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });

    return server;
  } catch (error) {
    console.error('Failed to start server:', error);
    try {
      await database.disconnect();
    } catch (disconnectError) {
      console.error('Error disconnecting database:', disconnectError);
    }
    process.exit(1);
  }
}

module.exports = { createApp, startServer };
