const lists = require("../modles/listing");

module.exports.index = async(req, res)=>{
    let listings = await lists.find()
    res.render("all_Lists.ejs", { listings });
}

module.exports.renderForm = (req, res)=>{
    res.render("addNewList.ejs");
}

module.exports.addNewListing = async ( req, res, next)=>{
   // let {title, description, image, price, location, country} = req.body;
  let listing = req.body.listing
  let newlist = new lists( listing );
  newlist.owner = req.user._id;
   await newlist.save();
   req.flash("success", "New Listing is Created");
   res.redirect("/listing")
}

module.exports.showlisting = async(req, res)=>{
    let {id} = req.params;
    let listing = await lists.findById(id).populate({path: "reviews", populate: {path: "author"}}).populate("owner");
    if(!listing){
        req.flash("error", "Listing you'r requsted is not exists");
        res.redirect("/listing");
    }
   res.render("showlist.ejs", { listing });
}

module.exports.renderEditForm = async(req, res)=>{
    let {id} = req.params;
    let listing = await lists.findById(id);
    // console.log(listing);
    res.render("editlist.ejs", {listing});
}

module.exports.updateListing = async(req, res)=>{
  
    let { id } = req.params;
    let updatedData = req.body;
    let updatedlist = await lists.findByIdAndUpdate(id, updatedData, {new: true});
    req.flash("success", "changes in Listing are saved");
    res.redirect(`/listing/${id}`);
}

module.exports.deleteListing = async(req, res)=>{
    let {id} = req.params;
    let tobedeleted = await lists.findByIdAndDelete(id);
    req.flash("success","List id deleted")
    console.log(tobedeleted)
    res.redirect("/listing");
}