const Router=require('express').Router;
const router = Router();
const mongoose = require('mongoose');
const Employee = require('../../db/employee.model');

const Employeemodel=require('./employee.funtion');


const validateUser = ( req ,res , next ) =>{
    console.log('middleware');
    next();
}



router.post('/',(req,res,next)=>
{
    console.log("hjhkk");
    Employeemodel.insert(req.body)
    .then(d => res.json(d))
    .catch(next);
    // Employeemodel.insert(req.body , n );
});


router.get('/find' , (req,res)=>{
   console.log("ashin mahat");
Employeemodel.findall().then(d=>res.json(d))

});

router.get("/:userId", (req, res, next) => {
    Employeemodel.findSingle(req.params.userId)
        .then(d => res.json(d))
        .catch(next);
});

// router.delete("/:id",(req,res,next)=>
// {
//     deleteid(req.params.id)
//     .then(d=>res.json(d))
//     .catch(next);
// })

router.delete("/:id", (req, res, next) => {
    Employeemodel.deleteid(req.params.id)
        .then(d => res.json(d))
        .catch(next);
});


router.put("/:id",(req,res,next)=>
{
    Employeemodel.update(req.params.id,req.body)
      .then(d=>res.json(d))
      .catch(next);
})






module.exports=router;