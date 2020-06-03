const router = require('express').Router();
const User = require('../model/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {registerValidation, loginValidation} = require('../validation');


router.post('/register', async (req,res)=>{
  
  // check if validation error
  const {error} = registerValidation(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  // check if email exists
  const emailExists = await User.findOne({email: req.body.email});
  if (emailExists) return res.status(400).send('Email already exists');

  // create salt for hashing
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password,salt);

  // create user
  const user = new User({
    avatar: req.body.avatar,
    age: req.body.age,
    email: req.body.email,
    name: req.body.name,
    role: req.body.role,
    surname: req.body.surname,
    password: hashedPassword,
  });
  // post user
  try {
    const savedUser = await user.save();
    // REMEMBER TO RETURN SOMETHING SMALLER THAN THE WHOLE USER (INSECURE)
    res.send(savedUser);
  } catch(err){
     res.status(400).send(err);
  }
})

router.post('/login', async (req,res)=>{
  const {error} = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // check if email exists
  const user = await User.findOne({email: req.body.email});
  // message is vague to diminish bruteforce attacks.
  if (!user) return res.status(400).send('Email or password is wrong');

  const passwordIsValid = await bcrypt.compare(req.body.password, user.password)
  if (!passwordIsValid) return res.status(400).send('Email or password is wrong');

  // Create an assign a jwt
  const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET)
  res.header('auth-token', token).send(token)
})

module.exports = router;