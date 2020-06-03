const router = require('express').Router();
const User = require('../model/User');
const verify = require('./verifyToken');

router.get('/user-info', verify, async (req,res)=>{
  const user = await User.findById(req.user._id);
  res.send(user)
})

module.exports = router;