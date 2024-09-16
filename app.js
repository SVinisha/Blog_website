import express from "express";
import bodyParser from "body-parser";
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); 

app.set('view engine', 'ejs');

let posts = [];

app.get('/', (req, res) => {
    res.render('index', { posts });
});


app.get('/create', (req, res) => {
    res.render('create');
});


app.post('/create', (req, res) => {
    const { title, body } = req.body;
    posts.push({ id: Date.now().toString(), title, body });
    res.redirect('/');
});


app.get('/edit/:id', (req, res) => {
    const post = posts.find(p => p.id === req.params.id);
    if (post) {
        res.render('edit', { post });
    } else {
        res.redirect('/');
    }
});


app.post('/edit/:id', (req, res) => {
    const { title, body } = req.body;
    const postIndex = posts.findIndex(p => p.id === req.params.id);
    if (postIndex !== -1) {
        posts[postIndex] = { id: req.params.id, title, body };
    }
    res.redirect('/');
});


app.post('/delete/:id', (req, res) => {
    posts = posts.filter(post => post.id !== req.params.id);
    res.redirect('/');
});


app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
