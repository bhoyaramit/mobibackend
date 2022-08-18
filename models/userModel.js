const mongoose = require("mongoose");



const UserSchema= mongoose.Schema({

name:{
    type:String,
},
email:{
    type:String
},
mobile:{
    type:String
},
image:{
    type:String
},
password:{
    type:String,
},
"fileupload_id" : Number,
location: {
     type: String
     },
rdoc:   {
    type: String,
},
randomNumber:   {
    type: String,
},
is_varified:{
    type:Number,
    default:0
}
});



module.exports = mongoose.model("user",UserSchema);