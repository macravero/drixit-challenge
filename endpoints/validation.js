const Joi = require('@hapi/joi')

// Register validation
const registerValidation = (data) =>{
  const schema = Joi.object({
    avatar: Joi.string().required(),
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    password: Joi.string().min(6).required(),
    surname: Joi.string().required(),
    age: Joi.number().required(),
    role: Joi.string().required()
  })

  return schema.validate(data);
}

const loginValidation = (data) =>{
  const schema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().min(6).required(),
  })

  return schema.validate(data);
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;