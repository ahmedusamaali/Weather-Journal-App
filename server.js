

// Setup empty JS object to act as endpoint for all routes
projectData = {};
// Require Express to run server and routes

// Start up an instance of app
var express = require('express'),
    cors = require("cors");
    app     = express();
    bodyParser = require('body-parser');
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));
const port = 5000;

// Setup Server
app.listen(port,()=>{
    console.log("Server Running localhost:"+ port)
});
//getting Data 
app.get('/data',sendAll);
function sendAll(req,res)
{
    res.send(projectData);
    projectData={};
}
//post function

app.post('/addData', addData);

function addData(request, response) {

    let data = request.body;

    console.log('server side data ', data);
    projectData["date"] = data.date;
    projectData["temp"] = data.temp;
    projectData["feel"] = data.f;

    response.send(projectData);
}