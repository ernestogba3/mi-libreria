const libroModel = require('../models/libroModel');

const libroController = {

    verLibros:(req,res) =>{
        const lista = libroModel.obtenerTodos();
        res.render('index',{lista});
    },

    mostrarFormularioNuevo: (req,res) =>{
        res.render('nuevo');
    },

    crearLibro: (req,res) =>{
        const {titulo,autor,estado,valoracion} = req.body;
        libroModel.guardar(titulo,autor,estado,valoracion);
        res.redirect('/libros');
    },

    mostrarEdicion: (req,res) =>{
        const libro = libroModel.obtenerPorId(req.params.id);
        res.render('editar',{libro});
    },

    actualizarLibro: (req,res) =>{
         const {titulo,autor,estado,valoracion} = req.body;
         libroModel.actualizar(req.params.id,titulo,autor,estado,valoracion);
         res.redirect('/libros');
    },

    eliminarLibro: (req,res) =>{
        libroModel.eliminar(req.params.id);
        res.redirect('/libros');
    }

};

module.exports = libroController;