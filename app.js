const express = require('express')
const app = express();
const cors = require("cors");
require('dotenv').config();

app.use(express.json());
app.use(cors());

app.listen(3000, async(req, res) => {
    try {
        console.log("Server Running Successfully!")
    } catch (error) {
        console.log(error.message)
    }
})
