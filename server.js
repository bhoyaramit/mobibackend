const express = require("express");
const app =express();
require("./db");
const port = process.env.PORT || 5000;
const bodyParser = require("body-parser");
const path = require("path");




app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));
app.set('view engine', 'ejs');



require("./config/config");
app.set('views', './views/users');


const user_route = require("./routes/userRoute");
app.use("/user",user_route);

// const fileUpload_route = require("./routes/fileuploadRoute");
// app.use("/file",fileUpload_route);




app.get('*', (req, res)=>{
    res.send('<h1>Please Enter Correct Route </h1>');
});


app.listen(port ,()=>{
    console.log(`connection is successful`);
});