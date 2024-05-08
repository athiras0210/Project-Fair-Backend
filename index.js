// 1  Loads .env file contacts into process.env by default
require('dotenv').config()

const https = require('https');
const fs = require('fs');
const applicationMiddleware = require('./Middlewares/applicationMiddleware');

//2 import express
const express = require('express')

// 3 import cors
const cors = require('cors')

//8 impoet db
const db = require('./DB/connection')


//9 import router
const router = require('./Routes/router')

// 4 create an applicication using express
const pfServer = express()

//5 use 
pfServer.use(cors())
pfServer.use(express.json())

//10 
pfServer.use(applicationMiddleware)
pfServer.use(router)

//Used to export images from backend
pfServer.use('/uploads',express.static('./uploads'))

//6 port creation 
const PORT = 4001 || process.env.PORT

// 7
pfServer.listen(PORT, () => {
    console.log("pfServer listening on the port " + PORT);
})

pfServer.get('/', (req, res) => {
    res.send("Welcome to Project Fair")
})


const app = express();






