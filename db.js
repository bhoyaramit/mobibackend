const mongoose  = require("mongoose");

const env = require('dotenv');

env.config();
const DATABASE_URl = process.env.DATABASE_URl;

mongoose.connect(DATABASE_URl)
.then(()=> console.log("connection successful"))
.catch((e) => console.log(e));

// mongoose.connect("mongodb://localhost:27017/mobigicdb")
// .then(()=> {
//     console.log("connection successful")} )
// .catch((e)=>{
//     console.log("No connection");
// })

