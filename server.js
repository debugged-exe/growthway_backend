const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
const multer = require('multer');
upload = multer();
var fs = require('fs');
const path = require('path');
var nodemailer = require('nodemailer');
const fileUpload = require('express-fileupload');


directory = path.dirname("");
var parent = path.resolve(directory, '..');
// your path to store the files
var uploaddir = parent + (path.sep) + 'emailprj' + (path.sep) + 'public' + (path.sep) + 'images' + (path.sep);
// express app
const app = express();

// listen for requests
app.listen(process.env.PORT || 3000, () => {
  console.log("Server running on port 3000")
});

const DB='mongodb+srv://growthway:growthway@cluster0.94k2t.mongodb.net/GrowthwayProject?retryWrites=true&w=majority'
mongoose.connect(DB,{
  useNewUrlParser:true,
  useCreateIndex:true,
  useUnifiedTopology:true,
  useFindAndModify:false
}).then(()=>{
  console.log('connection done growthway');
}).catch((err)=>console.log('no connection',err));


var transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
	  user: 'harshikasmishra@gmail.com',
	  pass: 'harshika@@2000'
	}
  });


var Schema = mongoose.Schema;
var survey = new Schema({
   name: String,
   email: String,
   age: String,
   gender: String,
   phone: String,
   education: String,
   occupation: String,
   location: String,
   income: String,
   savings: String,
   short_term_invest: String,
   invest: Array,
   trust: String,
   delay: String,
   return: String,
   risk: String,
   shortterm: String,
   shorttermplan: String,
   view_365: String,
   know: String,
   communication:String
},{
  collection: 'surveyform'
});

var callBack = new Schema({
   name: String,
   phoneno: String,
   query: String
},{
  collection: 'callback'
});


var blogs = new Schema({
   date: String,
   heading: String,
   description: String,
   img:String,
   display:String
},{
  collection: 'Blogs'
});

var clients = new Schema({
   describe:String,
   name:String
},{
  collection: 'Testimonials'
});

var faqs = new Schema({
   ques: String,
   answer:String,
   open:Boolean
},{
  collection: 'Faqs'
});

app.use(express.static('public'));
app.use(cors());
app.use(express.json());


var Project = mongoose.model('Project',survey);
var CallBack = mongoose.model('CallBack',callBack);
var BlogSection = mongoose.model('BlogSection',blogs);
var Faqs = mongoose.model('Faqs',faqs);
var Clients = mongoose.model('Clients',clients);


app.post('/',(req,res)=>{
  new CallBack({
    name:req.body.name,
    phoneno:req.body.phoneno,
    query:req.body.query
  })
  .save((err,doc)=>{
    if(err){
      res.json(err)
    }
    else{
      res.json("Success");
    }
  })
})

app.post('/surveyform',(req,res)=>{
  new Project({
    name:req.body.name,
    email:req.body.email,
    age:req.body.age,
    gender:req.body.gender,
    phone:req.body.phone,
    education:req.body.education,
    occupation:req.body.occupation,
    location:req.body.location,
    income:req.body.income,
    savings:req.body.savings,
    short_term_invest:req.body.short_term_invest,
    invest:req.body.invest,
    trust:req.body.trust,
    delay:req.body.delay,
    return: req.body.return,
    risk: req.body.risk,
    shortterm: req.body.shortterm,
    shorttermplan: req.body.shorttermplan,
    view_365: req.body.view_365,
    know: req.body.know,
    communication:req.body.communication
  })
  .save((err,doc)=>{
    if(err){
      res.json(err)
    }
    else{
      res.json("Success");
    }
  })
})

app.get('/blog',(req,res)=>{
  BlogSection.find(
    (err,doc)=>{
    if(err){
      console.log("No blogs yet");
      res.json(err)
    }
    else{
      res.json(doc);
      console.log(doc);
    }
  })
})

app.post('/about',(req,res)=>{
  new Faqs ({
    ques: req.body.ques,
    answer:req.body.answer,
    open:req.body.open
  })
  .save((err,doc)=>{
    if(err){
      res.json(err)
    }
    else{
      res.json("Success");
    }
  })
})

app.get('/about',(req,res)=>{
  Faqs.find(
    (err,doc)=>{
    if(err){
      console.log("received error");
      res.json(err)
    }
    else{
     doc.map((i,index)=>{
       if(i.answer===''){
        doc.splice(index,1);
       }
     })
      res.json(doc);
    }
  })
})

app.get('/',(req,res)=>{
  Clients.find(
    (err,doc)=>{
    if(err){
      res.json(err)
    }
    else{
      res.json(doc);
    }
  })
})

app.post('/workwithus', fileUpload(), function(req, res) {
  const sampleFile = req.files.uploadedFile;
  console.log(sampleFile);
  // do something with file
  res.send('File uploaded');
})

// app.post('/workwithus',upload.any(), (req,res) => {
//
// 	const query = req.body;
//
// 	const {name, email,phone_number,role,job} = query;
//     var file = req.body.files
//     console.log(file[0].originalname)
//     fs.writeFile(uploaddir + file[0].originalname, file[0].buffer, function(err) {})
//     var filepath = path.join(uploaddir, file[0].originalname);
//     console.log(filepath)
//
// 	if(query!==null)
// 	{
// 			  var mailOptions = {
// 				from: 'harshikasmishra@gmail.com',
// 				to: 'suhanismishra@gmail.com',
// 				subject: 'New Contact Entry',
//         text: 'Name: '+req.body.name+'\nEmail: '+req.body.email+'\nPhone_number: '+req.body.phone_number+'\nFor position of :'+req.body.role+'\nJob :'+req.body.job,
//         attachments: [{
//          filename: file[0].originalname,
//          streamSource: fs.createReadStream(filepath)
//        }]
//      };
//
// 			  transporter.sendMail(mailOptions, function(error, info){
// 				if (error) {
// 				  console.log(error);
// 				} else {
// 				  console.log('Email sent: ' + info.response);
// 				}
// 			  });
//
// 			  res.status(200).json("Success");
// 			// }
// 		//   })
// 	}
// 	else
// 	{
// 		res.status(400).json("Error")
// 	}
// })
