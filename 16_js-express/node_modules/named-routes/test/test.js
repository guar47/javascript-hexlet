var
  expect = require('expect.js'),
  sinon = require('sinon'),
  express = require('express'),
  request = require('supertest'),
  Router = require('../router.js');

module.exports = {
  'Reversable-router': {
    'beforeEach': function(){
      this.router = new Router();
    },
    'afterEach': function(){
      this.router = null;
    },
    'Express.js': {
      'beforeEach': function(){
        this.app = express();
        this.router.extendExpress(this.app);
        this.router.registerAppHelpers(this.app);
      },
      'afterEach': function(){
        this.app = null;
      },
      'build1': function() {
        this.app.get('/users', 'users', function(req,res) {});
        expect(this.router.build('users')).to.equal('/users');
      },
      'build2': function() {
        this.app.get('/:locale(en)', 'locale', function(req,res) {});
        expect(this.router.build('locale', {locale: 'en'})).to.equal('/en');
        expect(function(){this.router.build('locale', {locale: 'de'})}).to.throwError();
      },
      'build3': function() {
        this.app.get('/doctors/:speciality/:governorate', 'search.doctor', function(req,res) {});
        expect(this.router.build('search.doctor', {speciality: null, governorate: null})).to.equal('/doctors');
        expect(this.router.build('search.doctor', {speciality: "people", governorate: null})).to.equal('/doctors/people');
        expect(this.router.build('search.doctor', {speciality: "people", governorate: "peter"})).to.equal('/doctors/people/peter');
        expect(function(){this.router.build('search.doctor', {speciality: null})}).to.throwError();
        expect(function(){this.router.build('search.doctor', {governorate: null})}).to.throwError();
        expect(function(){this.router.build('search.doctor', {})}).to.throwError();
      },
      'extend': function(){
        expect(this.app.namedRoutes).to.be(this.router);
        expect(this.app._routingContext).to.be.ok();
        expect(this.app.get).to.be.a('function');
        expect(this.app['delete']).to.be.a('function');
        expect(this.app.post).to.be.a('function');
        expect(this.app.put).to.be.a('function');
        expect(this.app.locals.url).to.be.a('function');
      },
      'matches GET': function(done){
        this.app.get('/admin/user/:id', 'admin.user.edit', function(req,res) {
          res.sendStatus(200);
        });

        request(this.app).get('/admin/user/1')
        .expect(200, function(err) {
          if (err) return done(err);
          request(this.app).post('/admin/user/1')
          .expect(404, function(err) {
            if (err) return done(err);
            done();
          })
        })
      },
      'matches POST': function(done){
        this.app.post('/admin/user/:id', 'admin.user.edit', function(req,res) {
          res.sendStatus(200);
        });

        request(this.app).post('/admin/user/1')
        .expect(200, function(err) {
          if (err) return done(err);
          request(this.app).get('/admin/user/1')
          .expect(404, function(err) {
            if (err) return done(err);
            done();
          })
        })
      },
    },
    'Standalone': {
      'matches': function(){
        var
          self = this,
          dispatchSpy = sinon.spy(),
          routeSpy = sinon.spy(),
          req = {
            method: 'get',
            path: '/admin/user/1',
            params: {}
          };

        self.router.add('get', '/admin/user/:id', routeSpy, {
            name: 'admin.user.edit'
        });

        self.router.dispatch(req, {}, function(){ });

        expect(routeSpy.calledOnce).to.equal(true);
        expect(routeSpy.calledWith(req, sinon.match.any, sinon.match.any)).to.equal(true);

        req.method = 'post';

        self.router.dispatch(req, {}, dispatchSpy);

        expect(routeSpy.callCount).to.equal(1);
        expect(dispatchSpy.called).to.equal(true);
      },
      'optionals': function(){
        var
          self = this,
          spy = sinon.spy();

        self.router.add('post', '/admin/(user/(edit/:id/)(album/:albumId/):session/)test', spy);

        var req  = {
          method: 'post',
          path: '/admin/user/edit/4/album/2/qwjdoqiwdasdj12asdiaji198a/test'
        };
        self.router.dispatch(req, {}, function deadend(){ });

        req  = {
          method: 'post',
          path: '/admin/user/edit/4/qwjdoqiwdasdj12asdiaji198a/test'
        };
        self.router.dispatch(req, {}, function deadend(){ });

        req  = {
          method: 'post',
          path: '/admin/user/album/2/qwjdoqiwdasdj12asdiaji198a/test'
        };
        self.router.dispatch(req, {}, function deadend(){ });

        req  = {
          method: 'post',
          path: '/admin/test'
        };
        self.router.dispatch(req, {}, function deadend(){ });

        expect(spy.callCount).to.equal(4);
      },
      'reversing': function(){
        var
          self = this,
          spy = sinon.spy();

        expect(this.router.build).to.throwError();
        expect(function(){
          this.router.build('invalid route Name');
        }).to.throwError();

        self.router.add('post', '(/:controller(/:action(/:id)))', spy, {
          'name': 'reversed'
        });

        expect(self.router.build('reversed', {
          'controller': 'Home',
          'action': 'Index'
        })).to.equal('/Home/Index');

        self.router.dispatch({
          method: 'post',
          path: '/Home/Index/'
        });

        expect(spy.called).to.equal(true);

        self.router.add('post', '/todo/:user/:list/:id', spy, {
          'name': 'ajax'
        });

        expect(self.router.build('ajax', {
          'user': 'foo',
          'list': null,
          'id': null
        })).to.equal('/todo/foo');

        self.router.add('get', '/admin/(user/(edit/:id/)(album/:albumId/):session/)test', spy, {
          name: 'optionals'
        });

        expect(self.router.build('optionals', {
          id: 4,
          albumId:2,
          session: 'qwjdoqiwdasdj12asdiaji198a#asd'
        })).to.equal('/admin/user/edit/4/album/2/qwjdoqiwdasdj12asdiaji198a/test');

        expect(self.router.build('optionals', {
          id: 4,
          session: 'qwjdoqiwdasdj12asdiaji198a#asd'
        })).to.equal('/admin/user/edit/4/qwjdoqiwdasdj12asdiaji198a/test');

        expect(self.router.build('optionals', {
          albumId: 2,
          session: 'qwjdoqiwdasdj12asdiaji198a#asd'
        })).to.equal('/admin/user/album/2/qwjdoqiwdasdj12asdiaji198a/test');

        expect(self.router.build('optionals', {
          id: 4, albumId:2
        })).to.equal('/admin/test');
      },
      'masked': function(){
        var
          self = this,
          req = {
            method: 'get',
            path: ''
          },
          next = sinon.spy(),
          spy = sinon.spy();

        self.router.add('get', '/admin/*/user/*/:id', spy, {
          name: 'admin.user.edit'
        });

        req = {
          method: 'get',
          path: '/admin/any/user/thing/2'
        };
        self.router.dispatch(req, {}, next); // the next route shouldn't be called

        expect(spy.called).to.equal(true);
        // expect(next.called).to.equal(false);

        expect(self.router.build('admin.user.edit', {
          id:2, _masked: ['any','thing']
        })).to.equal('/admin/any/user/thing/2');

        self.router.add('get', '/admin/*/user/*/:id/albums/*', spy, {
          wildcardInPairs: true,
          name: 'admin.user.edit2'
        });

        req = {
          method: 'get',
          path: '/admin/any/user/thing/2/albums/sort/name/order/desc'
        };

        spy.reset();
        next.reset();

        self.router.dispatch(req, {}, next); // the next route shouldn't be called

        // expect(next.called).to.equal(false);
        expect(req.params).to.eql({
          _masked: [ 'any', 'thing'],
          id: '2',
          sort: 'name',
          order: 'desc'
        });

        expect(self.router.build('admin.user.edit2', {
          id:2,
          _masked: ['any','thing'],
          sort: 'name',
          'order': 'desc'
        })).to.equal('/admin/any/user/thing/2/albums/sort/name/order/desc');

        expect(spy.callCount).to.equal(1);
      },
    },
  }
};
