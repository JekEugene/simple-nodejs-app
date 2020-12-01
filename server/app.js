const express = require("express")
const app = express()
require("dotenv").config();
const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.get("/", (req, res)=>{
    res.send("hi")
})

async function start(){
    app.listen(process.env.PORT)
}

start()