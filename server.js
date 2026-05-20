const express = require('express');
const methodOverride = require('method-override');
const libroController = require('./controllers/libroController');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));

app.set('view engine','ejs');
app.set('views','./views');

app.get('/',(req,res) => res.redirect('/libros'));

// Rutas
app.get('/libros', libroController.verLibros);
app.get('/libros/nuevo', libroController.mostrarFormularioNuevo);
app.post('/libros', libroController.crearLibro);
app.get('/libros/:id/editar', libroController.mostrarEdicion);
app.put('/libros/:id', libroController.actualizarLibro);
app.delete('/libros/:id', libroController.eliminarLibro);

const PORT = 3000;

app.listen(PORT,() =>{
    console.log(`Estanteria corriendo en http://localhost:${PORT}`);
});

