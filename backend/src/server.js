import logger from "./utils/logger.js";
import app from "./main.js";
import db from "./models/index.js";

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await db.sequelize.authenticate();
    await db.sequelize.sync();
    logger.info("Database connected successfully");

    app.listen(PORT, () => {
      logger.info(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    logger.error(error);
    logger.error(`
    Database connection failed.

    Please ensure:
    1. MySQL is running
    2. Credentials in .env are correct
    3. If using Docker, run: docker compose up -d
    `);
    process.exit(1);
  }
}

startServer();
