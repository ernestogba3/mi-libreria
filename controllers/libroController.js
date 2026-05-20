const libroModel = require('../models/libroModel');

const libroController = {

    verLibros:(req,res) =>{
        const {estado, busqueda} = req.query; // lee ?estado=leyendo de la URL

        let lista;
        if(busqueda){
            lista = libroModel.buscar(busqueda); //Si hay busqueda lo busca
        }else if(estado){
            lista = libroModel.obtenerPorEstado(estado); //Si hay filtro lo filtra
        }else{
            lista = libroModel.obtenerTodos(); //Si no hay filtro, extrae todo
        }
        res.render('index',{lista,estado,busqueda}); //pasa el estado activo a la vista
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