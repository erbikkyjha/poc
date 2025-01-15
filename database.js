require('dotenv').config();
const { Sequelize } = require('sequelize');
const dbConfig = {
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT || 'postgres',
  port: process.env.DB_PORT || 5432,
  logging: process.env.DB_LOGGING === 'true', 
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
};

const sequelize = new Sequelize(dbConfig);

sequelize.authenticate()
  .then(() => {
    console.log('Database connection successful.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

  sequelize.sync({ force: false })
  .then(() => {
    console.log('Database synced successfully!');
  })
  .catch((error) => {
    console.error('Error syncing database:', error);
  });

module.exports = sequelize;
