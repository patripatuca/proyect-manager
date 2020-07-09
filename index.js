const express=require('express')
require('./models')
const app=express()



app.use(express.json())


app.listen(3000)