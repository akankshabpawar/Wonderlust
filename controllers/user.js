const User = require("../modles/user");
const passport = require("passport");

module.exports.renderSignupForm = (req, res)=>{
    res.render("user/signup.ejs");
}

module.exports.createNewUser = async (req, res)=>{
try{
    let { username, email, password } = req.body;
    let newUser = new User({email, username});
    let registerUser = await User.register(newUser, password);
    req.login(registerUser,(err)=>{
        if(err){
            return next(err);
        }
        req.flash("success", "Welcome to WonderLust");
        // console.log(registerUser);
        res.redirect("/listing");
    })
}catch(e){
    req.flash("error",e.message);
    res.redirect("/signup");
}    
}

module.exports.renderLoginForm = (req, res)=>{
    res.render("user/login.ejs");
}

module.exports.toLogin = async(req, res)=>{
    req.flash("success", " logged in successful");
    let redirectUrl = res.locals.redirectUrl || "/listing";  
    res.redirect(redirectUrl);
}

module.exports.logout = (req, res, next)=>{

    req.logout((err)=>{             // req.logout will delete the current fron req.user usinf seriliza and deserilize
        if(err){
            return next(err);
        }
    });
    req.flash("sucess", "you'r logged out");
    res.redirect("/listing");
} 