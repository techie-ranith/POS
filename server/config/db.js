require('dotenv').config();  
const sql = require('mssql');

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_HOST,
  database: process.env.DB_NAME,
  port: 1433,
  options: {
    encrypt: true, 
    trustServerCertificate: true 
  }
};

const connectToDb = async () => {
  try {
    await sql.connect(config);
    console.log('Connected to database');
  } catch (err) {
    console.error('Database connection failed:', err.stack);
  }
};

connectToDb();

module.exports = sql;
