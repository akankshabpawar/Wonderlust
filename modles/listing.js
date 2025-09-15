const mongoose = require("mongoose");
const Review = require("./review.js");
const User = require("./user.js");

const listSchema = mongoose.Schema({
   title:{
       type: String,
       required : true
    },
    description: String,
    image: {
        filename: String,
        url:{
            type: String,
            default: "https://unsplash.com/photos/a-view-of-a-beach-with-palm-trees-and-the-ocean-KGs0WH5_ooU",
            set: (v)=> v === "" ? "https://images.unsplash.com/photo-1695124568188-18e7d5577952?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" :v,
        }
    },
    price: Number,
    location: String,
    country: String,
    reviews:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Review"
        },
    ],
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
});

listSchema.post("findOneAndDelete", async function(doc){
    if(doc.reviews){
       let res = await Review.deleteMany({_id: {$in: doc.reviews}})
       console.log(res);
    }
});

const List = mongoose.model("List", listSchema);

// listSchema.post("findOneAndDelete", async function(doc){
//     if(doc && doc.reviews){
//         let res = await Review.deleteMany({_id: {$in: doc.reviews}});
//         console.log(res);
//     }
// });

// let list1 = new List({
//     title: "bozy Beachfront Cottage",
//       description:
//         "Escape to this charming beachfront cottage for a relaxing getaway. Enjoy stunning ocean views and easy access to the beach.",
//       image: {
//         filename: "listingimage",
//         url: "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
//       },
//       price: 1500,
//       location: "Malibu",
//       country: "United States",
// });

// list1.save().then((res)=>{
//     console.log(res, "down");
// }).catch((err)=>{
//     console.log(err);
//});

module.exports = List;
  