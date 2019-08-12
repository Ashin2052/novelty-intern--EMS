process.env.NODE_ENV = 'test';
let mongoose = require("mongoose");
let Employee = require('../db/employee.model');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();


chai.use(chaiHttp);
//Our parent block
describe('Employee', () => {
    beforeEach((done) => { //Before each test we empty the database
        Employee.remove({}, (err) => { 
           done();           
        });        
    });
  
/*
  * Test the /GET route
  */
  describe('/GET Employee', () => {
      it('it should GET all the books', (done) => {
        chai.request(server)
            .get('/employee/find')
            .end((err, res) => {

              console.log(res.body,'res')
                  res.should.have.status(200);
                  res.body.should.be.a('array');

              done();
            });
      });
  });

describe('/Post EEmployee',()=>
{
  it("it should post particular employee details",(done)=>
  {
    let emp={
      fullName : "ashinj8hjuj", 
    email : "ahhhdakja", 
    mobile : "23", 
    city : "male"
    }

    chai.request(server)
    .post('/employee')
    .send(emp)

    .end((err,res)=>
    {
      console.log(res.body)
      res.should.have.status(200);
      res.body.should.be.a('object');
      res.body.should.have.property('_id');
  done();
    })
  })
})

describe('/put emp id',()=>
{

  it('it should put a book by the given id', (done) => {

  let emp=new Employee({
    fullName : "tlcj.hugyukk gh..tt", 
    email : "ahhhdakja", 
    mobile : "23", 
    city : "male"
  })
  emp.save((err,emp)=>{
    chai.request(server)
    .put('/employee/'+emp.id)
    .send({fullName : "rrr", 
    email : "ahhhdakja", 
    mobile : "23", 
    city : "ww"})
    .end((err,res)=>{
      console.log(res.body,'putput')
      res.should.have.status(200);
      res.body.should.be.a('object');
      res.body.should.have.property('city').eql("ww");

      done();
    })
    
  });

})

})




describe('/DELETE/:id employee', () => {
  it('it should DELETE a employee given the id', (done) => {
      let emp = new Employee({fullName : "rrr", 
      email : "ahhhdakja", 
      mobile : "23", 
      city : "ww"})
      emp.save((err, emp) => {
            chai.request(server)
            .delete('/employee/' + emp.id)
            .end((err, res) => {
              console.log(res.body,"ash ash ash");
                  res.should.have.status(200);
                  res.body.should.be.a('object');
                  // res.body.result.should.have.property('ok').eql(1);
                  res.body.should.have.property('n').eql(1);
              done();
            });
      });
  });
});

}) 