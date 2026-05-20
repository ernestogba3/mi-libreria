const db = require('../config/database');

const libroModel = {
    obtenerTodos: () =>{
        return db.prepare('SELECT * from libros').all();
    },

    obtenerPorId: (id) => {
        return db.prepare('SELECT * FROM libros WHERE id = ?').get(id);
    },

    guardar: (titulo,autor,estado,valoracion) =>{
        return db.prepare('INSERT INTO libros(titulo,autor,estado,valoracion) VALUES (?,?,?,?)').run(titulo,autor,estado,valoracion);
    },

    actualizar: (id,titulo,autor,estado,valoracion) =>{
        return db.prepare(`UPDATE libros SET titulo = ?,
            autor = ?,estado = ?, valoracion = ?
            WHERE id = ?`).run(titulo,autor,estado,valoracion, id);
    },

    eliminar: (id) =>{
        return db.prepare('DELETE FROM libros WHERE id = ?').run(id);
    }

};

module.exports = libroModel;