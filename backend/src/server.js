import app from "./main.js";
import sequelize from "./config/database.js";

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log("Database connected successfully");

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error(error);
    console.error(`
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
