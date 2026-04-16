const Joi = require('joi');

// let sign_up_valid =(req,res,next)=>{
//     let schema = Joi.object({
//         fname:Joi.string().required(),
//         lname:Joi.string().required(),
//         email:Joi.string().email().required(),
//         mobile_no:Joi.number().required(),
//         password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
//         c_password: Joi.ref('password')
       
//      })
//      validateRequest(req, res, next, schema);
// }

let userValidation =(req,res,next)=>{

    userSchema = Joi.object().keys({ 
        fname: Joi.string().required(), 
        lname: Joi.string().required(), 
        email: Joi.string().required().email(),
        phone: Joi.number().required(),
        password: Joi.string().required(),
        status: Joi.string().required(),
        address: Joi.string().required()
    }); 
    validateRequest(req, res, next, userSchema);
}

let catValidation =(req,res,next)=>{
    
    catSchema = Joi.object().keys({ 
        cat_name: Joi.string().required(), 
        cat_desc: Joi.string().required(), 
    }); 

    validateRequest(req, res, next, catSchema);
}

function validateRequest(req, res, next, schema){
    let Data = req.body;
    console.log('----validateRequest req body----', req.body, schema);
    let validResult = schema.validate(Data)
    console.log('----validateRequest result----', validResult);
    if(validResult.error){
        res.send({result:'validation fail',show:validResult.error.details })
        console.log(validResult.error)
    }else{
        //res.send({result:'validation pass',show:Data})
        console.log('validation pass')
        next();
    }
}
module.exports={ userValidation, catValidation }