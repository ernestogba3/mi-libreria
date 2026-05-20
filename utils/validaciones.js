// utils/validaciones.js

const validarLibro = (datos) => {
    const errores = [];

    // Título obligatorio y mínimo 2 caracteres
    if (!datos.titulo || datos.titulo.trim().length < 2) {
        errores.push('El título debe tener al menos 2 caracteres.');
    }

    // Autor obligatorio y mínimo 2 caracteres
    if (!datos.autor || datos.autor.trim().length < 2) {
        errores.push('El autor debe tener al menos 2 caracteres.');
    }

    // Estado debe ser uno de los tres valores válidos
    const estadosValidos = ['pendiente', 'leyendo', 'terminado'];
    if (!estadosValidos.includes(datos.estado)) {
        errores.push('El estado no es válido.');
    }

    // Valoración entre 0 y 5
    const valoracion = parseInt(datos.valoracion);
    if (isNaN(valoracion) || valoracion < 0 || valoracion > 5) {
        errores.push('La valoración debe estar entre 0 y 5.');
    }

    // Si hay fecha de fin debe haber fecha de inicio
    if (datos.fecha_fin && !datos.fecha_inicio) {
        errores.push('No puedes añadir fecha de fin sin fecha de inicio.');
    }

    // La fecha de fin no puede ser anterior a la de inicio
    if (datos.fecha_inicio && datos.fecha_fin) {
        if (new Date(datos.fecha_fin) < new Date(datos.fecha_inicio)) {
            errores.push('La fecha de fin no puede ser anterior a la de inicio.');
        }
    }

    // Si está terminado debe tener valoración
    if (datos.estado === 'terminado' && parseInt(datos.valoracion) === 0) {
        errores.push('Un libro terminado debe tener valoración.');
    }

    // 👇 Nueva validación de notas
    if (datos.notas && datos.notas.length > 500) {
        errores.push(`Las notas no pueden superar los 500 caracteres (actualmente: ${datos.notas.length}).`);
    }

    return errores;
};

module.exports = { validarLibro };