const Router=require('express').Router;
const router = Router();
const jwt = require('jsonwebtoken');
const UserModal = require('./../db/user.model');

const userfunction=require('./User.function');
const sec=require('../config');

const validateUser = ( req , res ,next ) =>{
   const token = req.headers.authorization;
   console.log(token,'token',sec.secret,'secret')
   jwt.verify(token, sec.secret, function(err, decoded) {
      console.log(decoded,'decoded') // bar
      if( err ) return res.status(403).json({message:'User not authorized'});
      UserModal.findById(decoded.id)
      .then(res=>{
         console.log(res,'res');
      }).catch(error=>console.log(error))
      next();
    });
}

router.post('/',(req,res,next)=>
{
   // console.log(req.headers.authorization,'token')
   userfunction.SignUp(req.body)
   .then(d=>res.json(d))
   .catch(next);
});

router.post('/login',(req,res,next)=>
{
   console.log(req.headers.authorization,'token')

   userfunction.login(req.body)
   .then(d=>res.json(d))
   // .catch(next);
   .catch(e=>res.status(401).json({message:'Authentication failed'}));
});

router.get("/:userid",validateUser,(req,res,next)=>{
   // console.log(req.headers.authorization,'token')
   userfunction.findSingle(req.params.userid)
   .then(d=>res.json(d))
   .catch(e=>res.status(401).json(e))
});


// router.get("/:userId", (req, res, next) => {
//    userfunction.findSingle(req.params.userId)
//        .then(d => res.json(d))
//        .catch(next);
// });
module.exports=router;