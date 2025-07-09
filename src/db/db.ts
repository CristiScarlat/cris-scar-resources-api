import sqlite3 from 'sqlite3';
import path from 'path';

// Use verbose mode for debugging
sqlite3.verbose();

// Absolute path to your existing database file
const dbPath = path.resolve(__dirname, './stationsDB.db');

// Connect to the existing SQLite database
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Failed to connect to the database:', err.message);
  } else {
    console.log('Connected to the SQLite database.');
  }
});

export {db};