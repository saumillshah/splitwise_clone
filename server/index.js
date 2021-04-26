const express = require('express')
const app = express()
const cors = require('cors')
const authRoute = require('./routes/auth');
const userProfile = require('./routes/profile');
const group = require('./routes/group');
const expense = require('./routes/expense');
const comment = require('./routes/comment')
const mongoose = require('mongoose');
app.use(express.json());
app.use(cors({ origin: '3.226.254.12:3000', credentials: true }));



app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '3.226.254.12:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
  });

  app.use('/auth', authRoute)
  app.use('/profile', userProfile)
  app.use('/group',group)
  app.use('/expense',expense)
  app.use('/comment',comment)


  // mongoose.connect('mongodb+srv://Saumil123:sss1999$@cluster0.8e0yq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {useNewUrlParser:true}, ()=> console.log("Connected to db"))
  const URI =
  "mongodb+srv://Saumil123:Saumil123@cluster0.8e0yq.mongodb.net/Splitwise?retryWrites=true&w=majority";

var options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  poolSize: 10,
  bufferMaxEntries: 0,
};
const db = async () => {
  await mongoose.connect(URI, options, (err, res) => {
    if (err) {
      console.log("error:", err);
    } else {
      console.log("MongoDB connected");
    }
  });
};

db();

app.listen(3002, ()=>{
    console.log("Server running on 3002")
})

module.exports = db;