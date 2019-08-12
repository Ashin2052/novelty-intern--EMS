// require('./db/db');  
const config = require('./config')
const mongoose=require("mongoose");
const bodyparsers=require('body-parser');
const routeManager=require('./routes');

// const mongoose=require('mongoose');
const express=require('express');

// const swaggerUi = require('swagger-ui-express');
// const YAML = require('yamljs');
// const swaggerDocument = YAML.load( './swa');
 
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

mongoose.Promise = global.Promise;


require("dotenv").config({path:"variables.env"});

console.log("kkk")
mongoose
.connect(process.env.URL)
.then(result=>
    {
        console.log(
            'successfully conected to '+process.env.DB_NAME
                        );
    })
    .catch(err => {
        console.log("ERROR:", err.message);
      });


const app=express();

app.use(bodyparsers.urlencoded({
    extended:true
}));

app.use(bodyparsers.json({}));
app.use('/',routeManager);



// app.listen(config.PORT,()=>
// {
//     console.log("connection extablished",config.PORT);
// })


module.exports=app.listen(process.env.PORT, function () {
    console.log("Server is running at port:" + process.env.PORT);
  });
  

