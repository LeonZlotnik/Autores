const express = require('express');
const router  = express.Router();
//const Empresa = require('../models/empresas')
const Books = require('../models/books')

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/libros', (req, res)=>{
  Books.find()
    .then(libros =>{
      res.render('books', {libros})
    })
    .catch(err =>{
      console.log(err)
    })
})

router.get('/libros/add',(req,res)=>{
  res.render('libros-nuevo');
});

router.post('libros/add',(res,req) => {
  const {title, author, description, rating} = req.body;
  const newBook = new Books({title,author,description,rating});
  newBook.save()
  .then((book) => {
    res.redirect(301,'/libros');
})
  .catch((err)=>{
    console.log(err);
  })
});

router.get('libros/edit',(req,res) => {
 /* const Books = new Books({title, author, description, rating});
  Books.findOne(({_id: req.query.book_id}))
  .then((libro)=>{
    console.log(libro);
    res.render('edita-libro', {libro})
  })
   .catch((err)=>{
     console.log(err);
   })*/
   console.log('Edita libros')
   res.render('edita-libro');
});

router.post('libros/edit',(res,req) => {
  /*const {title, author, description, rating} = req.body;
  const Books = new Books ({title, author, description, rating})
  Books.updateOne({_id:req.query.book_id},{$set:{title,autor,descriptionrating}})
  .then((book) =>{
    res.redirect('libro')
  })
  .catch((err)=>{
    console.log(err);
  })*/
})

router.get('/libros/:id', (req, res)=>{
  /*let libroId = req.params.id
  console.log(libroId);
  Books.findOne({'_id': libroId})
  .then((libro)=>{
    res.render('book-detalle', { libro })
  })
  .catch((err)=>{
    console.log(err);
  })*/
})

router.post('/buscar', (req, res)=>{
  let nombreLibro = req.body.titulo;
  Books.findOne({title: {$regex: nombreLibro, $options: 'i'}})
  .then((libro)=>{
    res.redirect(301, `/libros/${libro._id}`)
  })
  .catch(err=>{
    console.log(err);
  })
})

router.get('/autores/nuevos', (res,req) =>{
  res.render('author-add')
})

router.post('/author/nuevo',(res,req) =>{
  const {name,lastName,nationality,birthday,pictureUrl} = req.body
  const newAuthor = new Author ({name, lastName, nationality, birthday, pictureUrl})
  newAuthor.save()
  .then((autor)=>{
    res.redirect('/libros')
  })
  .catch(err=>{
    console.log(err);
  })
})

module.exports = router;
