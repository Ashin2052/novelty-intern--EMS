const mongoose=require('mongoose');
const jwt=require('jsonwebtoken');
const UserModal = require('./../db/user.model');
// require("dotenv").config({path:"variables.env"});
const sec=require('../config');
const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotalySecretKey');

class Userclass{
    constructor(){}

    SignUp(payload)
    { 
        return new Promise((resolve, reject)=> {

        UserModal.findOne({
            name:payload.name
        }).then((User)=>
        {
            if(User)
            {
                resolve('user exist')
            }
            else{
                let obj=new UserModal(payload);
                const encryptedString = cryptr.encrypt(payload.password);
                obj.password=encryptedString;
                obj.save()
                .then(d=>resolve(d))
                .catch(e=>reject(e));
                console.log("break");
            }
        })
    });
    }




login(payload)
{
    return new Promise((resolve,reject)=>
    {
        UserModal.findOne({
        name:payload.name
        }).then((user)=>
        {
            if(!user)
            {
                resolve("user does not exist")
            }else {
                console.log("faaafdsa")
                const decryptedString = cryptr.decrypt(user.password);
                user.password=decryptedString;
                console.log(user)

                if( payload.password == user.password ) { 
                    const token=jwt.sign({
                        email:user.email,
                        name:user.name,
                        id:user._id
                    },sec.secret,{
                        expiresIn:'1h'
                    })
                    resolve(token);
                    console.log("ashin");
                }else {
                    reject('Authentication failed')
                }
            }
           
        })
    })
}

// userInfo(UserId)
// {
//     return new Promise((resolve,reject)=>
//     {
//         UserModal.findById(UserId)
//         .then(d=resolve(d))
//         .catch(e=>reject(e))
//     })
// }

findSingle(ll) {
    return new Promise((resolve, reject) => {
        UserModal.findById(ll)
            .then(d => resolve(d))
            .catch(e => reject(e));
    });
}
}

module.exports=new Userclass();