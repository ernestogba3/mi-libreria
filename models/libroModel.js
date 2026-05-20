const db = require('../config/database');

const libroModel = {
    obtenerTodos: () =>{
        return db.prepare('SELECT * from libros').all();
    },

    obtenerPorEstado:(estado) =>{

        return db.prepare('SELECT * FROM libros WHERE estado = ?').all(estado);

    },

    buscar:(termino) =>{
        return db.prepare('SELECT * FROM libros WHERE titulo LIKE ? OR autor LIKE ?').all(`%${termino}%`,`%${termino}`);
    },

    obtenerPorId: (id) => {
        return db.prepare('SELECT * FROM libros WHERE id = ?').get(id);
    },

    guardar: (titulo,autor,estado,valoracion,fecha_inicio,fecha_fin) =>{
        return db.prepare('INSERT INTO libros(titulo,autor,estado,valoracion,fecha_inicio,fecha_fin) VALUES (?,?,?,?,?,?)').run(titulo,autor,estado,valoracion,fecha_inicio,fecha_fin);
    },

    actualizar: (id,titulo,autor,estado,valoracion,fecha_inicio,fecha_fin) =>{
        return db.prepare(`UPDATE libros SET titulo = ?,
            autor = ?,estado = ?, valoracion = ?, fecha_inicio = ?, fecha_fin = ?
            WHERE id = ?`).run(titulo,autor,estado,valoracion,fecha_inicio,fecha_fin,id);
    },

    eliminar: (id) =>{
        return db.prepare('DELETE FROM libros WHERE id = ?').run(id);
    }

};

module.exports = libroModel;