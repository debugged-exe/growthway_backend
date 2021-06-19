const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
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


app.use(express.static('public'));
app.use(cors());
app.use(express.json());


var Project = mongoose.model('Project',survey);
var CallBack = mongoose.model('CallBack',callBack);

app.get('/',(req,res)=>{
  res.json("working");
})
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