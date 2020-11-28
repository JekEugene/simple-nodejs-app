const express = require("express")
    ,bodyParser = require('body-parser')
    //,Sequelize = require("sequelize")
    ,db = require("./config/database")
    ,hbs = require("handlebars")
    ,session = require('express-session')
    ,homeRouter = require("./routes/homeRouter.js")
    ,userRouter = require("./routes/userRouter.js")
    ,adminRouter = require("./routes/adminRouter.js")

const app = express()

app.use(session({
    secret: 'Secret',
    saveUninitialized: false,
    resave: false, 
    clientId: null,
    cookie: {
        secure: false, 
        httpOnly: true, 
        maxAge: 1000 * 60 * 60
    }
}));

app.set("view engine", "hbs");
//hbs.registerPartials(__dirname + "/views/partials");
//app.set("views", "templates"); // установка пути к представлениям

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/",homeRouter);

app.use((req, res, next)=>{
    if(req.session && req.session.clientId != null){
        next();
    } else {
        res.redirect("/")
    }    
})

app.use("/user", userRouter);
app.use("/admin", adminRouter);

async function start(){
    try {
        await db.sync();
        app.listen(3000)    
    } catch (e) {
        console.log(e)
    }
}

start()