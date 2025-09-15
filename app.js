
require('dotenv').config();


const express = require("express");
const app = express();
const methodOverride = require("method-override"); 
const mongoose = require("mongoose");
const path = require("path"); 
const ejs_mate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
// const wrapAsync = require("./utils/wrapAsync.js");
const User = require("./modles/user.js")

const passport = require("passport"); // passport
const LocalStrategy = require("passport-local");

const listingRoute = require("./routes/listing.js");
const reviewRout = require("./routes/review.js");
const userRoute = require("./routes/user.js");

const session = require("express-session");
const flash = require("connect-flash");



app.set("view engine", "ejs");
app.set('views', [path.join(__dirname, 'views/listing'), path.join(__dirname, 'views')]);

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(methodOverride("_method"));
app.engine('ejs', ejs_mate);

mongoose.connect('mongodb://127.0.0.1:27017/wonderlust').then(()=>{
    console.log("connected");
}).catch((err)=>{
    console.log("ERROR", err);
});

let sessionOptions = {
    secret: process.env.SEC, 
    resave: false, 
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true
    }
}

app.use(session( sessionOptions ));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy( User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use((req, res, next)=>{
    res.locals.successMsg = req.flash("success");
    res.locals.errorMsg = req.flash("error");
    res.locals.currUser = req.user;
    next();
});

//routes
app.use("/listing", listingRoute);
app.use("/listing/:id/review/",reviewRout);
app.use("/", userRoute);



// app.get("/demouser", async(req, res)=>{
//     let fakeuser = new User({
//         email: "demouser.in",
//         username: "demouser",
//     });
//     let result = await User.register(fakeuser, "demo");
//     console.log(result);
//     res.send(result);
// });

// app.get("/test",(req, res)=>{
//     if(req.isAuthenticated()){
//         req.flash("success", " your logged in");
//         console.log(req.user);
//         res.send("done");
//     }
//         req.flash("error", "your not valid user");

//     res.send("not done");
// })
app.get("/", (req, res)=>{
    res.send("Welcome to WonderLust");
})

// for all routs which are not define
app.all("*",(req, res, next)=>{
   next( new ExpressError(404, "page not found"))
});

app.use((err, req, res, next)=>{
    let {statusCode = 500, message = "Something went wrong" } = err;
    res.status(statusCode).render("./error.ejs",{ message });
})

app.listen(process.env.PORT, ()=>{
    console.log("app is listning")
});