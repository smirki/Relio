const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const cors = require('cors');

// create the server
const app = express();

// use middleware to parse request body into json
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// enable cross origin resource sharing (CORS) for our api calls
app.use(cors());

// establish connection to SQL database
const dbConn = mysql.createConnection({ host : 'localhost', user : 'user_name', password : 'password', database : 'database' }); dbConn.connect((err) => { if (err){ console.log("Error connecting to Database"); } else { console.log("Connected to Database"); }});

// create a route for our rest API that returns data from the database
app.get('/events', (req, res) => { let sqlQueryString = `SELECT * FROM events`; dbConn.query(sqlQueryString, (err, result) => { if (err){ res .status(400).send({ message: err }); } else { res .status(200).send({ message: "Success", data: result }); } }) });

// create a route that allows users to authenticate with their credentials
app.post('/login', (req, res) =>{ let username= req .body .username; let password= req .body .password; let sqlQueryString= `SELECT * FROM users WHERE username='${username}' AND password='${password}'`; dbConn.query(sqlQueryString, (err, result) =>{ if (!result || !result[0]){ return res .status(400).send({message:"Invalid Credentials"}); }else{ let token= jwt .sign ({ id:result[0].id}, process .env .SECRET ); return res .status(200).send ({ auth:true , token}); } }) });

// start the server on port 3000 and log a successful message in the console when ready
app.listen(3000, ()=> console .log ("Server running on port 3000"));