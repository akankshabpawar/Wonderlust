const lists = require("./modles/listing.js");
const reviews = require("./modles/review.js");

module.exports.isLoggedIn = (req, res, next)=>{
    // console.log(req.originalUrl);
    if(!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl
        req.flash("error", "You Must be Loged in");
        return res.redirect("/login");
    }
    next();
}

module.exports.saveRedirectUrl = (req, res, next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
}

module.exports.isOwner= async(req, res, next)=>{
    let { id } = req.params;
    let listing = await lists.findById(id);
    // console.log(listing.owner._id );
    // console.log(res.locals.currUser._id);
    if(!listing.owner._id.equals( res.locals.currUser._id)){
        req.flash("error", "you are not owner of this listing");
        return res.redirect(`/listing/${id}`);
    }
    next();
}
module.exports.isReviewAuthor = async(req, res, next)=>{
    let { id, reviewId } = req.params;
    let review = await reviews.findById(reviewId);

    if(!review.author._id.equals( res.locals.currUser._id)){
        req.flash("error", "you are not author of this review");
        return res.redirect(`/listing/${id}`);
    }
    next();
}