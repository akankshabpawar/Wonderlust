const mongoose = require("mongoose");
let initdata = require("./data");  // an obj initdata have key data: that store [30 lists]
/*initdata{ 
data: [{.................}]
}*/
let lists = require("../modles/listing");

mongoose.connect('mongodb://127.0.0.1:27017/wonderlust')
.then(()=>{
    console.log("connected");
}).catch((err)=>{
    console.log("ERROR", err);
});

let initDB = async ()=>{
    await lists.deleteMany({});
    initdata.data = initdata.data.map((obj)=> ({...obj, owner: "68777a797df254a474afb96a"}))
    await lists.insertMany(initdata.data);
    console.log("added");
}    
initDB();
