const fs = require('fs');
const path = require('path');
const db = require('./config/db');

async function initializeDB() {
  try {
    const schemaSql = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf-8');
    console.log('Executing schema.sql...');
    await db.query(schemaSql);
    console.log('Database initialized successfully with schema and mock data.');
  } catch (error) {
    console.error('Error initializing database:', error);
  } finally {
    process.exit(0);
  }
}

initializeDB();
