import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const port = 3000;
const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

let posts= [];

app.get("/", (req,res) => {
    res.render("index.ejs", {posts,
        year: new Date().getFullYear()
    });
});

app.post("/add", (req, res)=> {
        posts.push({
    title: req.body.title,
    content: req.body.content
        });
    
        res.redirect("/");
})

app.get("/edit/:id", (req,res) => {
    const id = req.params.id;

    if(!posts[id]){
        return res.status(404).send("Post not found");
    }

    res.render("edit.ejs", {
        post: posts[id], 
        id: id
    });
})

app.post("/update/:id", (req,res) => {
    const id = req.params.id;
    posts[id] = {
        title: req.body.title,
        content: req.body.content
    };
    res.redirect("/");
})

app.post("/delete/:id", (req,res) => {
    posts.splice(req.params.id, 1);
    res.redirect("/");
})

app.get("/post/:id", (req,res) => {
    const id = req.params.id;

  if (!posts[id]) {
    return res.status(404).send("Post not found");
  }

  res.render("page.ejs", {
    post: posts[id],
    id: id
  });
})

app.listen(port, () => {
    console.log(`The server is runing on ${port}.`);
});

