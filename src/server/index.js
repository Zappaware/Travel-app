//Starting point for all the dependencies
projectData = {};
var path = require('path');
const express = require('express');
const bodyParser = require('body-parser');


//Right here it is the starting point for the require and use methods for the server to use
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const cors = require('cors');
app.use(cors());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
  })

// I added this snipet of code because of the requirements MeaningCloud API

app.use(express.static('dist'));


console.log(__dirname);

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
    //res.sendFile(path.resolve('src/client/views/index.html'))
});

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('Example app listening on port 8081!')
   });


//GET route for all the information
app.get('/all', (req, res)=>{
    res.send(projectData)
});

//POST route for the postData function
app.post('/add', (req, res) =>{
    projectData.weatherData = req.body.weatherData;
    projectData.tempData = req.body.tempData;
    projectData.minTempData = req.body.minTempData;
    projectData.maxTempData = req.body.maxTempData;
    projectData.snowData = req.body.snowData;
    console.log(projectData)
    res.send(true)
});

