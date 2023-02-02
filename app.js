const express = require('express');

const app = express();

//register view engine
app.set('view engine', "ejs");



app.listen(3000);

app.get('/', (req, res) => {
   //res.send("<h1>Hello Valera from the server</h1>");
   //res.sendFile('./views/index.html', {root: __dirname });
   res.render("index.ejs");
});

app.get('/about', (req, res) => {
   //res.send("<h1>About Shevchenko page</h1>");
   //res.sendFile('./views/about.html', {root: __dirname });
   res.render("about.ejs");

});

//redirect
/**
  app.get("/about-us", (req, res)=>{
   res.redirect("/about")
})
 */

//404 page
app.use((req, res)=>{
   //res.status(404).sendFile('./views/404.html', {root: __dirname})
   res.status(404).render("404.ejs")
})
