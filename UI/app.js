let express = require('express')
let mongoose = require('mongoose');
let path = require('path')
let session = require('express-session');
require('dotenv/config')
let mongoStore = require('connect-mongo');
let multer = require('multer')();

//We specify constants
PORT_NUMBER = process.env.PORT || 3000

const app = express()

//This is the stage we connect to the database
mongoose.connect("mongodb+srv://RonnieJ:XPTHZSRxgRSSlPV7@cluster0.apwhp.mongodb.net/?retryWrites=true&w=majority").then((data)=>{
    console.log("Have we been able to connect to the database")
}).catch((err)=>{
    console.log("The connection to the database has been successfull actually now");
    console.log(err);
})

//We set the static folder in this section and also set express related settings in this section


app.set('views', path.join(__dirname, 'view'))
app.set('view engine', "pug")
app.use(express.json())
app.use(express.urlencoded({ extended: false }))


//We might maintain express session from here if needed
const store = mongoStore.create({
    client: mongoose.connection.getClient(),
    dbName: "test"
})
app.use(session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: true,
    cookie: { maxAge: 86400000 },
    resave: false,
    rolling: true,
    store: store
}))

//Here we are setting up the multer to store file to the database


//We import all the routes in this section of the app
let homeRoute = require('./routes/home')
let loginRoute = require('./routes/login')
let patientRoute = require('./routes/patient')
let addRoute = require('./routes/addS');
let userRoute = require('./routes/user')


//We setup all the required route path from this section
//this is the part we check the authentication of the user from here
app.use('/user',(req,res,next)=>{
    if(!req.session.contactNumber){
        console.log("Do we get here")
        res.status(300).redirect('../login');
    }else{
        next()
    }
})

app.use('/patient/add',(req,res,next)=>{
    if(!req.session.contactNumber){
        res.status(300),redirect('../login');
    }else{
        next()
    }
})


app.use(express.static(path.join(__dirname, 'a-eye')));

//We need to modify it later
app.get('/', (req, res) => {
    res.send("We have started the express application for now lets check in thunderbird");
})
app.use('/home', homeRoute)
app.use('/login', loginRoute)
app.use('/patient', patientRoute)
app.use('/admin', addRoute)
app.use('/user',userRoute)


//let us listen to the server from here
try {
    app.listen(PORT_NUMBER, () => {
        console.log("Express application has been started in port number ", PORT_NUMBER);
    })
} catch (error) {
    console.log("We failed to listen to the server");
    console.log("\n ERROR MESSAGE \n");
    console.log(error.message);
    console.log("\nError description\n");
    console, log(error)
}
