const express = require('express')
const dotenv = require('dotenv')
const app = express();
const mongoose = require('mongoose')
// import routes
const authRoute = require('./endpoints/routes/auth');
const userRoute = require('./endpoints/routes/user');


dotenv.config();

// connect to DB
mongoose.connect(process.env.DB_CONNECT,
  {useNewUrlParser: true},
  ()=>console.log('connected to MongoDB')
);


// Middlewares
app.use(express.json());
// CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, auth-token");
  next();
});
// Route Middlewares
app.use('/api/v0', authRoute)
app.use('/api/user', userRoute);


app.listen(3001,()=>{
  console.log('app running on port: 3001')
})