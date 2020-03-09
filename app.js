const express = require('express');
const bodyParser = require('body-parser');
const product = require('./routes/product.route');
const mongoose = require('mongoose');
const uri = 'mongodb://127.0.0.1:27017/test'
// const MongoClient = require('mongodb').MongoClient;
// // const uri = "mongodb+srv://kay:myRealPassword@cluster0.mongodb.net/test?w=majority";
// const client = new MongoClient(uri, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// });
// client.connect(err => {
//     if (err) return console.log(err);
//     console.log("connected");
//     const collection = client.db("test").collection("devices");
//     client.close();
// });

let dev_db_url = 'mongodb://127.0.0.1:27017/';
let mongoDB = process.env.MONGODB_URI || dev_db_url;
setTimeout(() => {
    mongoose.connect(mongoDB, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    
}, 60000);
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.once('open', () => console.log('connected to database'))
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use('/products', product);
let port = 1234;
app.listen(port, () => {
    console.log('Server is up and running on http://127.0.0.1:' + port);
});