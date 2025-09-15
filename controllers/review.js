const reviews = require("../modles/review.js");
const lists = require("../modles/listing.js");

module.exports.createReview = async(req, res)=>{
    let {id} = req.params;
    let listing = await lists.findById(id);
    let review = req.body.review;
    review.author = req.user._id;
    // console.log(review);
    let newReview = new reviews(review);

    listing.reviews.push(newReview);
        await newReview.save();
        await listing.save();
   res.redirect(`/listing/${id}`)
}

module.exports.deleteReview = async (req, res)=>{
    let { id, reviewId } = req.params;

    let toDelete = await reviews.findByIdAndDelete(reviewId);
    let updatedList = await lists.findByIdAndUpdate(id, {$pull: {review: reviewId }}) // pull out the reviwe by it id  it will search id in review arr
    console.log(toDelete);
    res.redirect(`/listing/${id}`);
}