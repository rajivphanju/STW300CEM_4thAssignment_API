require('./db/mongoose'); //including mongoose class
const User = require('./models/user'); //including model class
const Item = require('./models/item');
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const bodyParser = require('body-parser');
const path = require('path');

const app=express();
app.use(express.json());
app.use(cors());

app.use('/uploads',express.static('./public/uploads'));
app.use(bodyParser.urlencoded({extended:false}));

var storage = multer.diskStorage({
    destination: './public/uploads',
    filename: (req, file, callback) => {
        let ext = path.extname(file.originalname);
        callback(null, file.fieldname + '-' + Date.now() + ext);
    }
    });
    
    //validations
    var imageFileFilter = (req, file, cb) => {if
        (!file.originalname.match(/\.(jpg|jpeg|png|PNG|gif)$/))
         {return cb(new Error("You can upload only image files!"), false); }
         cb(null, true);};

    var upload = multer({ storage: storage,
        fileFilter: imageFileFilter,
        limits: { fileSize: 1000000 }
    });

    //files= name of the input type in form(client Side)
    app.post('/upload', upload.single('imageFile'), (req, res) => {
        res.json(req.file);
       });

app.post("/registerUser",(req,res)=>{
     
    var myData = new User(req.body);
    myData.save().then(function(){
        res.send('User Registered');
    }).catch(function(e){
        res.send(e);
    });
  });

  app.post("/insertItem",(req,res,next)=>{
     
    var myData = new Item(req.body);
    myData.save().then(function(){
        res.send('Item Added');
    }, (err) => next(err))
    .catch((err) => next(err));
  });


    app.get('/items',(req, res, next) => {
        Item.find({})
            .then((items) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(items);
            }, (err) => next(err))
            .catch((err) => next(err));
        });

       app.post('/login',(req,res)=>{
            User.findOne({username:req.body.username,password:req.body.password}).then((user)=>{
               if(user){
                res.json("success");
               }else{
            res.json("invalid");

               }
            });
       });
       

      
      
app.listen(8080);