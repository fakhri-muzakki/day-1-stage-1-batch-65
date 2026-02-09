import 'dotenv/config';
import app from './app';
import { connectDatabase, pool } from './config/database';

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    // 1️⃣ Test database connection
    await connectDatabase();

    // 2️⃣ Start HTTP server
    const server = app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
      console.log(`📦 Environment: ${process.env.NODE_ENV || 'development'}`);
    });

    // Handle unhandled promise rejections
    process.on('unhandledRejection', (err: Error) => {
      console.error('💥 UNHANDLED REJECTION! Shutting down...');
      console.error(err.name, err.message);
      server.close(() => process.exit(1));
    });

    // Handle SIGTERM
    process.on('SIGTERM', async () => {
      console.log('👋 SIGTERM RECEIVED. Shutting down gracefully');
      await pool.end();
      server.close(() => {
        console.log('✅ Process terminated!');
      });
    });
  } catch (err) {
    console.error('💥 Server failed to start');
    process.exit(1);
  }
};

startServer();

// Handle uncaught exceptions (harus paling atas secara konsep)
process.on('uncaughtException', (err: Error) => {
  console.error('💥 UNCAUGHT EXCEPTION! Shutting down...');
  console.error(err.name, err.message);
  process.exit(1);
});
