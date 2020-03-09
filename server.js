const express = require('express')
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose')
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
const uri = 'mongodb://127.0.0.1:27017/test1'
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
var db = mongoose.connection;
// console.log("dbbb",db);

if(!db){
    console.log("something wrong to connect DB");
}
else{console.log("DB Connected");
}
let userRoute = require("../crud_mongo_node/routes/user.route")
app.use('/api', userRoute)
var port = process.env.PORT || 8080;
// app.get('/', (req, res) => res.send('API working'));
app.listen(port, (err) => {
    if (err) return next(err)
    console.log("server start on http://127.0.0.1:" + port);
})