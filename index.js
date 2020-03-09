const express = require('express');
const bodyParser = require('body-parser')

const app = express();
app.use(bodyParser.urlencoded({
    extended: true
}));
app.set('view engine', 'ejs');
// res.render(view, locals)

const MongoClient = require('mongodb').MongoClient

var db;
const cloud_url = 'mongodb+srv://iflairemp245:iflair123@cluster0-sodc3.mongodb.net/test?retryWrites=true&w=majority'
const local_url = 'mongodb://127.0.0.1:27017'
MongoClient.connect(cloud_url, {
    useUnifiedTopology: true,
    useNewUrlParser: true
}, (err, client) => {
    if (err) return console.log("connection error", err);
    db = client.db('star-wars-quotes');
    console.log("mongo connected");
    app.listen(3000, () => {
        console.log("app runing on port 3000");
    })
});

app.get('/', (req, res) => {
    // res.send('Welcome to Root')
    res.sendFile(__dirname + '/index.html')
});
app.get('/allquotes', (res, req) => {
    db.collection('quotes').find().toArray((err, result) => {
        if (err) return console.log(err)
        // res.render('index.ejs', {
        //     quotes: result
        // })
    })

})
app.post('/quotes', (req, res) => {
    console.log("req.body", req.body)
    db.collection('quotes').insertOne(req.body, (err, result) => {
        // console.log("req.body",req.body);
        if (err) return console.log(err);
        console.log("record save");
        res.redirect('/');
    })
});