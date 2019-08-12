const Router=require('express').Router;
const EmployeeController=require('./Employee/employee.controller/employee.contrller');
const UserController=require('./User/User.controller');

let router=Router();

router.get('/',(req,res)=>{
    res.json("ashin ahha haha");
})


router.use('/employee',EmployeeController);
router.use('/User',UserController);

module.exports=router;
