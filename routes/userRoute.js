const exppress = require("express");
const router = exppress.Router();

const userController = require("../controllers/userController");

const multer = require("multer");
const path = require("path");
const auth  = require("../middleware/auth");
const nodemailer = require("nodemailer");
const config = require("../config/config");
const session = require("express-session");
router.use(session({secret:config.sessionSecret}));

router.use(exppress.static("public"));


const upload = multer({
  
    storage: multer.diskStorage({
  
      destination: function (req, file, cb) {
        cb(null, `public/user_Images`);
  
      },
  
      filename: function (req, file, cb) {
  
        cb(null, `${Date.now()}-${file.originalname}`)
        
      }
  
    })
  })
  
  module.exports = upload;
  


router.get("/",auth.islogout,userController.loadRegister);

router.post("/",upload.any(),userController.insertUser);

router.get("/login",auth.islogout,userController.loginload);
router.post("/login",userController.verifylogin);

router.get("/home",auth.islogin,userController.loadhome);
router.get("/logout",auth.islogin,userController.userLogout);

router.get("/edit",auth.islogin,userController.editload);
router.post("/edit",upload.single('image'),userController.updateProfile);

router.post('/delete/:id',userController.deleteUser);
router.get('/download/:fileupload_id',userController.download);



router.get("/list",userController.UserList);

module.exports = router;


// const storage =multer.diskStorage({
//     destination:function(req,file,cb){
//         cb(null,path.join(__dirname,'../public/user_Images'),function(error,success){
//             if (error)throw error 


//         });

//     },
//     filename:function(req,file,cb){

//        const name= Date.now()+'-'+file.originalname;
//         cb(null,name,function(error1,success1){
//             if (error1)throw error1 
//         })
//     }
// });

// const upload = multer({
//     storage:storage
// });