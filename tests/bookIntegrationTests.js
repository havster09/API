var should = require('should'),
    request = require('supertest'),
    app = require('../app.js'),
    mongoose = require('mongoose'),
    Book = mongoose.model('Book'),
    agent = request.agent(app);


describe('Book Crud test',function(){
   it('should allow book to be posted and return _id and read',function(done){
       var bookPost = {
           "title":"some shitty book",
           "author": "haven ramos",
           "genre": "fiction",
           "read": false
       };
       agent.post('/api/books')
           .send(bookPost)
           .expect(200)
           .end(function(err,results){
               results.body.read.should.not.equal(false);
               results.body.should.have.property('_id');
               done();
           });
       afterEach(function(done){
           Book.remove().exec();
           done();
       })
   })
});


