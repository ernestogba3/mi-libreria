const Database = require('better-sqlite3');

const db = new Database('estanteria.db');

const sql = 'CREATE TABLE IF NOT EXISTS libros (' +
    'id INTEGER PRIMARY KEY AUTOINCREMENT,' +
    'titulo TEXT NOT NULL,' +
    'autor TEXT NOT NULL,' +
    'estado TEXT DEFAULT pendiente,' +
    'valoracion INTEGER DEFAULT 0' +
')';

db.exec(sql);

module.exports = db;