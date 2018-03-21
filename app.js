var express = require('express');
var path = require('path');
var User = require('./models/users');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
const dbconnection = require('./config/config');
var session = require('express-session');
var passwordHash = require('password-hash');
var isLoggedIn = require('./middlwares').isLoggedIn;
const multer = require('multer');
const { multerSaveTo } = require('./multer');


//mongoose.Promise = global.Promise;

//calling here my function !! to connect mlab database online for mongo look at config file :)
dbconnection();



//this is for mongodb connection if you don't wanna connect to mlab :) this is local db.
/************************************************************/
//mongoose.connect('mongodb://localhost/Market')
//.then(() =>  console.log('connection succesful'))
//.catch((err) => console.error(err));


var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//app.use(express.static(path.join(__dirname, 'uploads')));
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/ads/");
  },

  filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  }
});

// const fileFilter = (req, file, cb) => {
//   // reject a file
//   if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
//     cb(null, true);
//   } else {
//     cb(null, false);
//   }
// };

const upload = multer({
  storage: storage,
  // limits: {
  //   fileSize: 1024 * 1024 * 5
  // },
  // fileFilter: fileFilter
});


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(session({
  secret: 'Marketing',
  resave: false,
  saveUninitialized: true
}));


app.use('/', index);
app.use('/users', users);

//Get the Home page 
/**************************************************************************** */

app.get('/register', function (req, res) {
  res.render('user/register', { title: 'sign up', error: '', user: '' });
});


//get Bio page 


/*************************************************************************** */

/*create new user */
//New User Here Registeration 

app.post('/register', async (req, res, next) => {
  try {
    let newDoc = await User.user.create(req.body)
    res.status(201).redirect('/register');
  } catch (err) {
    console.log(err)
  }

  //    var newuser = new User.user(
  //   {
  //     _id: mongoose.Types.ObjectId(),
  //     name: name,
  //     username: username,
  //     password: password,

  //     admin: admin,
  //     state: state,
  //     points: points

  //   }
  // )

  // newuser.save().then(function () {
  //   // res.send('success');

  // });
});

//Login 
/*If User exist */
//Hello login Function 

app.route('/login').get(function (req, res) {
  res.render('user/register', { title: 'Login', error: '', user: '' });
}).post(function (req, res) {
  // get from db 
  User.user.findOne({ username: req.body.usernamel }, function (err, user) {
    if (err) {
      console.log("Not found");
      //throw err;
    }

    if (user) {
      if (req.body.passwordl == user.password) {
        //res.send('logged in');
        // save in session
        console.log("From if password matched");
        req.session.loggedUser = user;
        res.redirect('/profile');
      }
      else {
        console.log("else 1");

        res.render('user/register', { title: 'Login', error: "password error", user: req.body });
      }
    }
    else {
      console.log("else 2 ");
      res.render('user/register', { title: 'Login', error: "username error", user: req.body });

    }
  });
});
app.use(isLoggedIn);

app.get('/profile', isLoggedIn, (req, res) => {

  res.render('user/register1', { title: 'Profile', user: req.session.loggedUser });
});

app.get('/home', isLoggedIn, (req, res) => {

  res.render('user/home', { title: 'home', user: req.session.loggedUser });
});
//End of login 

/********************************************** */
//Hey user 
//Please Fill your bio
/*app.post('/profile',(req,res)=>{
    let email = req.body.email;
    let phone = req.body.phone;
    let biodesc = req.body.bio;
    let admin = false;
    let state = 'active';
    let points = 0;
 
    var newuser = new User.users(
      {
        _id:mongoose.Types.ObjectId(),
        name : name,
    username: username,
    password: password,
    
    admin: admin,
    state:state,
    points:points
 
      }
    )
    newuser.save().then(function(){
      //res.send('success');
     //res.redirect('/users/login');
   });
});*/


//End of Bio-Information



//Add Adv :D 

/**************************************************************** */
//create new Adv 

app.post('/home', async (req, res) => {
  try {
    console.log("dddd")

    req.body.image = req.file

    let newDoc = await User.adv.create(req.body);
    res.redirect('/home');
  } catch (err) {
    console.log(err)
  }


  // let title = req.body.title;
  // let desc = req.body.description;
  // let bio = "";
  // let cat = "";
  // let city = "";
  // let image = "";

  // let deleted = false;
  // let state = req.body.type;
  // let points = 0;
  // let period = req.body.advp;
  // let price = req.body.price;
  // let phone = req.body.mobile;

  // var newadv = new User.advs(
  //   {
  //     _id: mongoose.Types.ObjectId(),
  //     title: title,
  //     desc: desc,
  //     user: bio,
  //     cat: cat,
  //     city: city,
  //     image: image,

  //     deleted: deleted,
  //     state: state,
  //     points: points,
  //     period: period,
  //     price: price,
  //     phone: phone

  //   }
  // )
  // newadv.save().then(function () {
  //   //res.send('success');

  // });
});




/************************************************************************/
//Handel errors 

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
app.listen(8888, () => {
  console.log("server is running....")
});
module.exports = app;
