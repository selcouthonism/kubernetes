const database = require('./config/database');
const { startServer } = require('./server');

 // Startup delay simulation (for testing)
  const delay_startup = process.env.DELAY_STARTUP === 'true';
  if (delay_startup) {
    console.log('Delaying startup by 60 seconds...');
    const start = Date.now();
    while (Date.now() - start < 60000) {
      // Busy-wait to simulate startup delay
    }
  }
  console.log(`delay_startup: ${delay_startup}`);
  

// Handle graceful shutdown
process.on('SIGTERM', async () => {
  console.log('SIGTERM received, shutting down gracefully...');
  try {
    await database.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('Error during shutdown:', error);
    process.exit(1);
  }
});

// Start the server
startServer();
