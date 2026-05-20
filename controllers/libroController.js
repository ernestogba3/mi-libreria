const libroModel = require('../models/libroModel');
const {validarLibro} = require('../utils/validaciones');

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

    verDetalle: (req,res) =>{

        const libro = libroModel.obtenerPorId(req.params.id);
        res.render('detalle',{libro});
    },

    mostrarFormularioNuevo: (req,res) =>{
        res.render('nuevo',{errores: [] });//Pasa array vacio de errores
    },

    crearLibro: (req,res) =>{
        const {titulo,autor,estado,valoracion,fecha_inicio,fecha_fin} = req.body;
        const errores = validarLibro(req.body);

        if(errores.length >0){
            return res.render('nuevo',{errores,datos:req.body});
        }

        libroModel.guardar(titulo,autor,estado,valoracion,fecha_inicio || null ,fecha_fin || null);
        res.redirect('/libros');
    },

    mostrarEdicion: (req,res) =>{
        const libro = libroModel.obtenerPorId(req.params.id);
        res.render('editar', { libro, errores: [] }); // 👈 Pasa array vacío de errores
    },

    actualizarLibro: (req,res) =>{
         const {titulo,autor,estado,valoracion,fecha_inicio,fecha_fin} = req.body;
          // Si hay errores vuelve al formulario mostrándolos
        if (errores.length > 0) {
            const libro = { ...req.body, id: req.params.id };
            return res.render('editar', { libro, errores });
        }
        
         libroModel.actualizar(req.params.id,titulo,autor,estado,valoracion,fecha_inicio || null,fecha_fin || null);
         res.redirect('/libros');
    },

    eliminarLibro: (req,res) =>{
        libroModel.eliminar(req.params.id);
        res.redirect('/libros');
    }

};

module.exports = libroController;