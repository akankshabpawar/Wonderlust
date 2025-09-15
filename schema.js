const Joi = require("joi");
const Review = require("./modles/review");

// const listingSchema = Joi.object({
//   listing: Joi.object({
//     title: Joi.string().required(),
//     description: Joi.string().required(),
//     price: Joi.number().min(0).required(),
//     location: Joi.string().required(),
//     country: Joi.string().required(),
//      image: Joi.object({
//       filename: Joi.string(),
//       url: Joi.string().uri()
//     }).optional().unknown(true)
//   }).required()
// });

// module.exports =  listingSchema ;

const reviewSchema = Joi.object({
    review: Joi.object({
        comment: Joi.string().required(),
        rating: Joi.string().required().min(1).max(5),
        date: Joi.date(),
    }).required()
})

module.exports = reviewSchema;