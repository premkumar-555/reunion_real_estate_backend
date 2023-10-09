const express = require('express')
const app = express();
const cors = require("cors");
require('dotenv').config();
const connect = require('./src/DBConfig/connection')
const PORT = process?.env?.PORT || 3000;
const commonController = require('./src/Controllers/common.controller')

app.use(express.json());
app.use(cors());
app.use('/api', commonController)
app.listen(PORT, async(req, res) => {
    try {
        await connect()
        console.log("Server Running Successfully! ", PORT)
    } catch (error) {
        console.log(error.message)
    }
})
