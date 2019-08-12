const mongoose = require('mongoose');
const Employee = mongoose.model('Employee');



class Emp
{
 constructor(){}


 insert(payload )
{
    // console.log("ashin mahat");
    return new Promise((resolve, reject)=> {
    // // var employee=new Employee();
    // // employee.fullName=req.body.fullName;
    // // employee.email=req.body.email;
    // // employee.mobile=req.body.mobile;
    // // employee.city=req.body.city;
    // // resolve(employee.save());
//    Employee.findOne({fullName:payload.fullName}).then(res=>{
//        console.log( res , 'res')
//        if( res ) {
//         response.json({message:'user exist'})
//        }else {
//           let obj = new Employee(payload);
//           obj.save().then(user=>response.json({
//               user:user
//           }))           
      
//        }
//    });
console.log("dmsam")
    Employee.findOne({
        fullName:payload.fullName
    }).then((user)=>
    {console.log(user,'user')
        if(user)
        {
         resolve('user exist')
        }
    else{
        let obj=new Employee(payload);
        console.log("ash hole");
      obj.save()
      .then(d=>resolve(d))
      .catch(e=>reject(e));

    console.log("break");
    }
    }) ;
});
}



 findall()
{
    return new Promise((resolve,reject)=>
    {
        resolve(Employee.find());

        console.log("ahjk akja adjlka");
    });
}

 findSingle(userId) {
    return new Promise((resolve, reject) => {
        Employee.findById(userId)
            .then(d => resolve(d))
            .catch(e => reject(e));
    });
}

 deleteid(userId)
{
    return new Promise((resolve,reject)=>
    {
        Employee.remove({
            _id: userId
        })
        .then(d=>resolve(d))
        .catch(e=>reject(e));
    })
}

 update(userId,payload)
{
    return new Promise((resolve,reject)=>
    {
        Employee.findOneAndUpdate({
            _id: userId
        }
        ,
        {
            $set:payload
        },
        {
            new:true
        })
        .then(d=>resolve(d))
        .catch(e=>reject(e));
    })
}

}

module.exports=new Emp();