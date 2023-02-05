const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

const blogRoutes = require('./routes/blogRoutes.js');

const app = express();

//connect to MongoDB
mongoose.set('strictQuery', false);

const dbURI =
  'mongodb+srv://sheva:1234@cluster0.rluhgii.mongodb.net/node-tutorial?retryWrites=true&w=majority';

mongoose
  .connect(dbURI, { useNewUrlParser: true })
  .then(res => app.listen(3000))
  .catch(err => console.log(err));

//view engine
app.set('view engine', 'ejs');

//middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});

//routes
app.get('/', (req, res) => {
  res.redirect('/blogs');
});

app.get('/about', (req, res) => {
  res.render('about.ejs', { title: 'About' });
});

//blog routes
app.use(blogRoutes);

//404 page
app.use((req, res) => {
  //res.status(404).sendFile('./views/404.html', {root: __dirname})
  res.status(404).render('404.ejs', { title: '404' });
});
