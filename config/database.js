const Database = require('better-sqlite3');

const db = new Database('estanteria.db');

const sql = 'CREATE TABLE IF NOT EXISTS libros (' +
    'id INTEGER PRIMARY KEY AUTOINCREMENT,' +
    'titulo TEXT NOT NULL,' +
    'autor TEXT NOT NULL,' +
    'estado TEXT DEFAULT pendiente,' +
    'valoracion INTEGER DEFAULT 0,' +
    'fecha_inicio TEXT DEFAULT NULL,' +
    'fecha_fin TEXT DEFAULT NULL,' +
    'genero TEXT DEFAULT NULL,' +
    'notas TEXT DEFAULT NULL' +
')';

db.exec(sql);

try {
    db.exec('ALTER TABLE libros ADD COLUMN notas TEXT DEFAULT NULL');
} catch (e) {
    // La columna ya existe, ignoramos el error
}

module.exports = db;