const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog.js');

const app = express();

//connect to MongoDB
mongoose.set('strictQuery', false);

const dbURI =
  'mongodb+srv://sheva:1234@cluster0.rluhgii.mongodb.net/node-tutorial?retryWrites=true&w=majority';

mongoose
  .connect(dbURI, { useNewUrlParser: true })
  .then(res => app.listen(3000))
  .catch(err => console.log(err));

//register view engine
app.set('view engine', 'ejs');

//middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'));
app.use((req, res, next) => {
    res.locals.path = req.path;
    next();
});

//routes
app.get('/', (req, res) => {
  res.redirect('/blogs')

});

app.get('/about', (req, res) => {
  res.render('about.ejs', { title: 'About' });
});


//blog routes

app.get('/blogs/create', (req, res) => {
    res.render('create', { title: 'Create a new blog' });

});


app.get('/blogs', (req, res)=>{
  Blog.find().sort({createdAt: -1})
      .then((result)=>{
        res.render('index.ejs', { title: 'All blogs', blogs:result });
      })
      .catch((err)=>console.log(err))
})

app.post("/blogs", (req, res)=>{
    const blog = new Blog(req.body);

    blog.save()
        .then((result)=>{
            res.redirect("/blogs");
        })
        .catch((err)=>console.log(err))
});

app.get('/blogs/:id', (req, res)=>{
    const ID = req.params.id;
    Blog.findById(ID)
        .then(result =>{
            res.render("details", {blog:result, title: "Blog Details"})
        })
        .catch((err)=>console.log(err));
})

app.delete('/blogs/:id',(req, res)=>{
   const id = req.params.id;
    Blog.findByIdAndDelete(id)
        .then(result =>{
         res.json({redirect:"/blogs"})
        })
        . catch((err)=>console.log(err));

})




//404 page
app.use((req, res) => {
  //res.status(404).sendFile('./views/404.html', {root: __dirname})
  res.status(404).render('404.ejs', { title: '404' });
});



// const blogs = [
//   {
//     title: 'Beautiful Life',
//     snippet:
//       "In this blog, I wanted to focus on the feeling that there's a real strength in the human spirit when you try to look for beauty in different situations.",
//   },
//   {
//     title: 'How Can We Protect the North Pacific Right Whale?',
//     snippet:
//       ' The North Pacific right whale is one of the rarest of all large whale species, and one of the most endangered species on the planet.Despite its massive size (more than 50 feet long!), the North Pacific right whale feeds on tiny plankton by filtering hundreds of gallons of seawater in a single gulp to filter out the organisms with baleen plates.',
//   },
//   {
//     title: 'Climate Change',
//     snippet:
//       'Climate change blog articles about climate crisis, global warming, and our responsibility to climate change. Helping inspire and restore our environment.',
//   },
// ];
// res.render('index.ejs', { title: 'Home', blogs });


/**
 //mongoose and mongo sandbox routes

 app.get('/add-blog', (req, res)=>{
  const blog= new Blog({
    title: "new blog 2",
    snippet: "about  new blog",
    body: "more information about new blog"
  });

blog.save()
    .then((result)=>{
      res.send(result)
    })
    .catch((err)=>{console.log(err)});
})

 //all-blogs
 app.get('/all-blogs', (req, res)=>{
  Blog.find()
      .then((result)=>{
        res.send(result);
      })
      .catch(err=>{console.log(err)});
});

 //single-blog
 app.get('/single-blog', (req, res)=>{
  Blog.findById("63dc8f78146aaa7b6372f0b8")
      .then((result)=>{
        res.send(result);
      })
      .catch(err=>{console.log(err)});
})
 */
