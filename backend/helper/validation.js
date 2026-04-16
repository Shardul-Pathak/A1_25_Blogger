const Joi = require('joi');

let categoryValidation =(req,res,next)=>{
   let schema = Joi.object({
    cat_name: Joi.string().required(),
    cat_desc: Joi.string().required(),
    status: Joi.string()
  });
     validateRequest(req, res, next, schema);
}

let postsValidation =(req,res,next)=>{
    let schema = Joi.object({
        title:Joi.string().alphanum().required(),
        desc:Joi.string().alphanum().required(),
        status:Joi.string().required(),
        cat_id:Joi.number().required(),
        auth_id:Joi.number().required()
       
     })

     validateRequest(req, res, next, schema);
}


let AutherValidation =(req,res,next)=>{
    let schema = Joi.object({
        first_name:Joi.string().alphanum().required(),
        last_name:Joi.string().alphanum().required(),
        email:Joi.string().email().required(),
        phone:Joi.number().required()
       
     })

     validateRequest(req, res, next, schema);
}

let commentsValidation =(req,res,next)=>{
    let schema = Joi.object({
        comments: Joi.string().alphanum().required(),
        subject: Joi.string().alphanum().required(),
        status: Joi.string(),
        post_id: Joi.number().required()
      });

     validateRequest(req, res, next, schema);
}

let userValidation =(req,res,next)=>{
    let schema = Joi.object({
        fname: Joi.string().required(),
        lname: Joi.string().required(),
        email: Joi.string().email(),
        password: Joi.string().required(),
        status: Joi.boolean(),
      });

     validateRequest(req, res, next, schema);
}

function validateRequest(req, res, next, schema){
    let Data = req.body;
    let validResult = schema.validate(Data)
    if(validResult.error){
        res.send({result:'validation fail',show:validResult.error.details })
        console.log('validation fail')
    }else{
        //res.send({result:'validation pass',show:Data})
        console.log('validation pass')
        next();
    }
}
module.exports={categoryValidation,postsValidation,AutherValidation,commentsValidation, userValidation}