let expect = require('chai').expect
var request = require('superagent');
let boot = require('../bin/index').boot
let shutdown = require('../bin/index').shutdown
let port = require('../bin/index').port
const ROOT_PATH = 'http://localhost:' + port
const API_PATH = ROOT_PATH + '/api'
const POST_PATH = API_PATH + '/posts'
const ID_POST_PATH = API_PATH + '/posts' + '/29'
describe('basic-node-serve', function () {
  before(function () {
    boot()
  });

  it('should respond to GET',function(done){
    request
      .get(ROOT_PATH)
      .end(function(err, res){
        expect(res.status).to.equal(200);
        done()
      })
  })

  it('respond Basic API', function(done){
    request
      .get(API_PATH)
      .end(function(err, res){
        expect(res.status).to.equal(200);
        done()
      })
  })

  it('respond all post', function(done){
    request
      .get(POST_PATH)
      .end(function(err, res){
        expect(res.status).to.equal(200)
        done()
      })
  })

  it('respond new post', function(done){
    request
      .post(POST_PATH)
      .type('application/x-www-form-urlencoded')
      .send({title: 'Test', categories: 'Name', content: 'country'})
      .end(function(err, res){
        expect(res.status).to.equal(200)
        expect(res.request._data.title).to.equal('Test')
        expect(res.request._data.categories).to.equal('Name')
        expect(res.request._data.content).to.equal('country')
        done()
      })
  })

  it('respond one post', function(done){
    request
      .get(ID_POST_PATH)
      .end(function(err, res){
        expect(res.status).to.equal(200)
        done()
      })
  })

  it('respond update post', function(done){
    request
      .put(ID_POST_PATH)
      .send({title: 'Test update', categories: 'Name update', content: 'country update'})
      .end(function(err, res){
        expect(res.status).to.equal(200)
        expect(res.request._data.title).to.equal('Test update')
        expect(res.request._data.categories).to.equal('Name update')
        expect(res.request._data.content).to.equal('country update')
        done()
      })
  })

  it('respond delete post', function(done){
    request
      .delete(ID_POST_PATH)
      .end(function(err, res){
        expect(res.status).to.equal(200)
        done()
      })
  })

  after(function () {
    shutdown()
  })
})