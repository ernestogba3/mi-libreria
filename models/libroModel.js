const db = require("../config/database");

const libroModel = {
  obtenerTodos: () => {
    return db.prepare("SELECT * from libros").all();
  },

  obtenerPorEstado: (estado) => {
    return db.prepare("SELECT * FROM libros WHERE estado = ?").all(estado);
  },

  buscar: (termino) => {
    return db
      .prepare("SELECT * FROM libros WHERE titulo LIKE ? OR autor LIKE ?")
      .all(`%${termino}%`, `%${termino}`);
  },

  obtenerPorId: (id) => {
    return db.prepare("SELECT * FROM libros WHERE id = ?").get(id);
  },

  obtenerEstadisticas: (req, res) => {
    const total = db.prepare("SELECT COUNT(*) as total FROM libros").get();
    const porEstado = db
      .prepare(
        "SELECT estado, COUNT(*) as cantidad FROM libros GROUP BY estado",
      )
      .all();
    const mediaValoracion = db
      .prepare(
        "SELECT ROUND(AVG(valoracion), 1) as media FROM libros WHERE valoracion > 0",
      )
      .get();
    const generoFavorito = db
      .prepare(
        "SELECT genero, COUNT(*) as cantidad FROM libros WHERE genero IS NOT NULL GROUP BY genero ORDER BY cantidad DESC LIMIT 1",
      )
      .get();
    const totalConFechas = db
      .prepare(
        "SELECT COUNT(*) as total FROM libros WHERE fecha_inicio IS NOT NULL AND fecha_fin IS NOT NULL",
      )
      .get();

    return {
      total: total.total,
      porEstado,
      mediaValoracion: mediaValoracion.media || 0,
      generoFavorito: generoFavorito ? generoFavorito.genero : "Sin datos",
      totalConFechas: totalConFechas.total,
    };
  },

  guardar: (
    titulo,
    autor,
    estado,
    valoracion,
    fecha_inicio,
    fecha_fin,
    genero,
    notas,
  ) => {
    return db
      .prepare(
        "INSERT INTO libros(titulo,autor,estado,valoracion,fecha_inicio,fecha_fin,genero,notas) VALUES (?,?,?,?,?,?,?,?)",
      )
      .run(
        titulo,
        autor,
        estado,
        valoracion,
        fecha_inicio,
        fecha_fin,
        genero,
        notas,
      );
  },

  actualizar: (
    id,
    titulo,
    autor,
    estado,
    valoracion,
    fecha_inicio,
    fecha_fin,
    genero,
    notas,
  ) => {
    return db
      .prepare(
        `UPDATE libros SET titulo = ?,
            autor = ?,estado = ?, valoracion = ?, fecha_inicio = ?, fecha_fin = ?,genero = ?, notas = ?
            WHERE id = ?`,
      )
      .run(
        titulo,
        autor,
        estado,
        valoracion,
        fecha_inicio,
        fecha_fin,
        genero,
        notas,
        id,
      );
  },

  eliminar: (id) => {
    return db.prepare("DELETE FROM libros WHERE id = ?").run(id);
  },
};

module.exports = libroModel;
