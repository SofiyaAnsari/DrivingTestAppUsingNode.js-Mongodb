const express = require("express");
var bodyParser = require('body-parser');
const path = require("path");
const drivingtest = require('./models/drivingtest')
const mangoose = require("mongoose");

const app = new express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }))
app.listen(3000);

app.set("Views engine", "ejs");

app.get("/", (req, res) => { 
  res.render(path.resolve(__dirname, "Views/dashboard.ejs"));
});

app.get("/login", (req, res) => {
  res.render(path.resolve(__dirname, "Views/login.ejs"));
});

app.get("/userNotFound", (req, res) => {
  res.render(path.resolve(__dirname, "Views/user_not_found.ejs"));
});

app.get("/g2Test", (req, res) => {
  res.render(path.resolve(__dirname, "Views/g2.ejs"));
});

app.post("/g2Test", (req, res) => { 
  const newUser = drivingtest({
    firstname:req.body.firstname,
    lastname: req.body.lastname,
    LicenseNo:req.body.LicenseNo,         
    Age:req.body.Age, 
  
    car_details:{
      make:req.body.make,
      model:req.body.model,
      year:req.body.year,
      platno:req.body.platno,
    }        
});
newUser.save(newUser)
.then((result) => {
  console.log(result);
  res.redirect('/g2Test');
})
.catch((err) => {
  console.log(err);
});

});

app.get("/gTest", (req, res) => {
  let userData = new drivingtest;
  console.log(userData)
  res.render(path.resolve(__dirname, "Views/g1.ejs"),{userData:userData});
});

app.post("/gTest", (req, res) => {
  drivingtest.findOne({LicenseNo: req.body.LicenseNo})
  .then((userOne)=>{
    if(userOne != null && userOne != undefined)
    {
      res.render(path.resolve(__dirname, "Views/g1.ejs"),{userData:userOne});
    }
    else
    {
      res.redirect('/userNotFound');
    }
       })
   .catch((error)=>{    
     
   });
});

app.post("/update/gTest", (req, res) => {
 drivingtest.findOneAndUpdate({LicenseNo: req.body.LicenseNo},
  {
    car_details:{
      make:req.body.make,
      model:req.body.model,
      year:req.body.year,
      platno:req.body.platno,
    }
  }    
  )
  .then((userOne)=>{
        // let userData = new drivingtest;
        res.redirect('/gTest');
        // res.redirect(path.resolve(__dirname, "Views/g_test.ejs")
        // ,{userData : userData});
       })
   .catch((error)=>{
       res.status(400).json({messageError : error});
       res.render(path.resolve(__dirname, "Views/g1.ejs"),{data : 'No user Found'})
   });
});
