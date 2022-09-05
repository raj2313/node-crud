const express = require('express');
const mongoose = require('mongoose');
var cors = require('cors')
const routeuser = require('./routes/routeuser');
const routecompany = require('./routes/routecompany');
const bodyParser = require('body-parser');

const app = express();

// const options = {
//     url: "http://127.0.0.1:5500"
// }
// app.use("*", cors(options));


app.use( cors());

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())




const config = require ('./config/database');


mongoose.connect(config.database)
.then(() => {
    console.log('Database connection successful')
})
.catch(err => {
    console.error('Database connection error')
})


// app.use(bodyParser.urlencoded({extended:false}))
// app.use(bodyParser.json())

app.use("/user", routeuser);
app.use("/comapny", routecompany)

app.get("/",function(req,res){
    res.end("hello world");
})

const port = 3000
app.listen(port, function(){
  console.log("server is running port " + port);
});