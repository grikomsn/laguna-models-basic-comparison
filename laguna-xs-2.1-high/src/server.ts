import { createServer } from 'http';
import dotenv from 'dotenv';
import { app, defaultDb as db } from './index';

// Load environment variables
dotenv.config();

// Server entry point
const PORT = parseInt(process.env.PORT || '3000', 10);

async function startServer() {
  try {
    // Initialize database
    await db.init();
    console.log('✅ Database initialized');

    // Create HTTP server
    const server = createServer(app);

    // Start server
    server.listen(PORT, () => {
      console.log(`✅ Server is running on http://localhost:${PORT}`);
      console.log(`📊 Health check: http://localhost:${PORT}/health`);
      console.log(`📚 API docs: http://localhost:${PORT}/api`);
    });

    // Graceful shutdown
    process.on('SIGTERM', () => {
      console.log('🛑 Graceful shutdown...');
      server.close(() => {
        console.log('✅ Server closed');
        db.close();
        process.exit(0);
      });
    });

    process.on('SIGINT', () => {
      console.log('🛑 Graceful shutdown...');
      server.close(() => {
        console.log('✅ Server closed');
        db.close();
        process.exit(0);
      });
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
}

startServer();
