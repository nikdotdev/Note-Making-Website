const express = require("express");
const app = express();
const path = require("path");
const fs= require('fs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  fs.readdir(`./files`, function(err, files){
    res.render("pure", {files: files});
  })
});

app.post("/create", function(req, res){
  fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt`, `${req.body.description}`, function(err){
    res.redirect("/");
  })
})

app.get("/files/:filename", (req, res) => {
  fs.readFile(`./files/${req.params.filename}`, 'utf-8', function(err, data){
    res.render('show', {filename: req.params.filename, desc: data });
    })
});

app.get("/edit/:filename", (req, res)=>{
  res.render('edit', {filename: req.params.filename}); 
})

app.post("/edit", function (req, res) {
  fs.rename(
    `./files/${req.body.prev}`,
    `./files/${req.body.new.split(" ").join("")}.txt`, function(err){
      res.redirect("/");
    }
  );
});


app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
