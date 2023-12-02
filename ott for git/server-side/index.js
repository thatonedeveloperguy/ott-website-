const express=require("express")
require("dotenv").config()
const routes=require("./router/router")
const cors = require('cors');



let app=express()
app.use(cors());

app.use(express.json())
app.use('/api',routes)


app.listen(8000,()=>
{
console.log('listening to  8000')
})