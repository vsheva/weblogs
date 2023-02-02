const express = require('express');
const morgan = require('morgan');

const app = express();

//register view engine
app.set('view engine', "ejs");

app.listen(3000);

app.use(morgan("dev"))


app.get('/', (req, res) => {
   //res.send("<h1>Hello Valera from the server</h1>");
   //res.sendFile('./views/index.html', {root: __dirname });
   const blogs = [{title:"Beautiful Life", snippet: "In this blog, I wanted to focus on the feeling that there's a real strength in the human spirit when you try to look for beauty in different situations."},
      {title:"How Can We Protect the North Pacific Right Whale?", snippet: " The North Pacific right whale is one of the rarest of all large whale species, and one of the most endangered species on the planet.Despite its massive size (more than 50 feet long!), the North Pacific right whale feeds on tiny plankton by filtering hundreds of gallons of seawater in a single gulp to filter out the organisms with baleen plates."},
      {title:"Climate Change", snippet: "Climate change blog articles about climate crisis, global warming, and our responsibility to climate change. Helping inspire and restore our environment."},
   ];
   res.render("index.ejs", {title:"Home", blogs});
});

app.get('/about', (req, res) => {
   //res.send("<h1>About Shevchenko page</h1>");
   //res.sendFile('./views/about.html', {root: __dirname });
   res.render("about.ejs", {title:"About"});

});


/**
 //redirect
   app.get("/about-us", (req, res)=>{
   res.redirect("/about")
})
 */
app.get('/blogs/create', (req, res) => {
   res.render("create.ejs", {title:"Create a new Blog"});
});



//404 page
app.use((req, res)=>{
   //res.status(404).sendFile('./views/404.html', {root: __dirname})
   res.status(404).render("404.ejs", {title: "404"})
})
