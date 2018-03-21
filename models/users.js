//import { mongo } from 'mongoose';

var mongoose = require('mongoose');

//userModule

var userSchema = new mongoose.Schema({

  name: { type: String },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  bio: { type: mongoose.Schema.ObjectId, ref: "bio" },
  adv: [{ type: mongoose.Schema.ObjectId, ref: "Adv" }],
  admin: { type: Boolean, default: false },
  state: { type: String, default: "active" },
  points: { type: Number, default: 0 },

},
  {
    timestamps: true
  });


//User Bio Module

var bioSchema = new mongoose.Schema({

  email: { type: String },

  user: { type: mongoose.Schema.ObjectId, ref: "user" },
  phone: { type: Number },
  biodesc: { type: String },
  city: { type: mongoose.Schema.ObjectId, ref: "City" },

  image: { data: Buffer, contentType: String }

},
  {
    timestamps: true
  });

//Advertisements Module 
var advSchema = new mongoose.Schema({
  title: {
    type: String
  },
  desc: {
    type: String
  },
  user: { type: mongoose.Schema.ObjectId, ref: "user" },
  catitem: { type: mongoose.Schema.ObjectId, ref: "catitem" },
  city: { type: mongoose.Schema.ObjectId, ref: "city" },
  image: { type: String},
  deleted: { type: Boolean, default : 0 },
  state: { type: String},
  points: { type: Number, default : 0 },
  period: { type: Number },
  price: { type: Number,  },
  phone: { type: String }

},
  {
    timestamps: true
  });

//categories Module
var catSchema = new mongoose.Schema({
  name: { type: String },
  //catitems: [{ type: mongoose.Schema.ObjectId, ref: "catitem" }],
},
  {
    timestamps: true
  });

//cities Module

var citySchema = new mongoose.Schema({
  name: { type: String },
  adv: [{ type: mongoose.Schema.ObjectId, ref: "Adv" }],
},
  {
    timestamps: true
  });

//images Module
var imgsSchema = new mongoose.Schema({


  image: { data: Buffer, contentType: String },
  adv: { type: mongoose.Schema.ObjectId, ref: "Adv" },

},
  {
    timestamps: true
  });


//cat-items
var catitemSchema = new mongoose.Schema({
  name: { type: String },
  cat: { type: mongoose.Schema.ObjectId, ref: "cat" },
},
  {
    timestamps: true
  });



//end of modules 
//end of db schemas

/******************************************************************************/

//export modules to bd used 

var user = mongoose.model('user', userSchema);
var bio = mongoose.model('bios', bioSchema);
var adv = mongoose.model('adv', advSchema);
var imgs = mongoose.model('img', imgsSchema);
var city = mongoose.model('city', citySchema);
var cat = mongoose.model('cat', catSchema);
var catitem = mongoose.model('catitem', catitemSchema);


module.exports =
  {
    cats: cat,
    catitem: catitem,
    city: city,
    img: imgs,
    user: user,
    bios: bio,
    adv: adv
  };