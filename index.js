require('dotenv').config()
const express=require('express')
require('./models')

//colocaremos las cookies e las instalaremos mediante el npm install//
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');


const{login,controlAcceso}=require("./controllers/autenticacion")
const {dashboard}=require('./controllers/dashboard')

const app=express()


//se pone por que el formulario nos dara los datos en este formato//
app.use(express.urlencoded({ extended: false }));

//almacenamiento de datos//
app.use(cookieParser());
app.use(cookieSession({
  name: 'cookiesesion',
  keys: [process.env.KEY1, process.env.KEY2],
  //validez max en mlseg de la cookie//se puede poner el tiempo en process.envDURACION_COOKIE,pero solo el 5
  maxAge: 5 * 60 * 1000
}));

//view engine setup
app.set('views','./views')
app.set('view engine','ejs')

app.use(express.json())

//definicion de rutas
app.get('/', controlAcceso("leer-tareas-asignadas"),dashboard)
app.get("/login",(req,res)=>res.render("login"))
app.post("/login", login)


app.listen(3000)