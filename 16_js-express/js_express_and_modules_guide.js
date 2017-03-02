import Express from 'express';
import Router from 'named-routes';            // module for naming HTTP routes
import morgan from 'morgan';                  // module for logging web server
import debug from 'debug';                    // module for debug logging
import pug from 'pug';                        // template processor
import methodOverride from 'method-override'; // override http methods in express

const app = new Express();                    // create instance of application Express
const router = new Router();                  // create instance of router
const logger = morgan('combined');            // define morgan logger
const httpRequestLog = debug('http:request'); // define debug for GET HTTP requests (namespace)
const rpcLog = debug('rcp');                  // define debug for RCP data (namespace)

router.extendExpress(app);                    // routes connect to express
router.registerAppHelpers(app);               // ??
app.use(logger);                              // force express use morgan for stdout logging
httpRequestLog('request');                    // start http debugger
rpcLog('action');                             // start rcp debugger
// You should use environment variables for STOUT
// DEBUG=* bin/server.js - for all logs (includes app depends modules)
// DEBUG=http:* bin/server.js - for only http namespace
// DEBUG=*,-not-this bin/server.js - for all, except -not-this namespace
app.set('view engine', 'pug');                // add pug template processor to express
app.use('/assets', Express.static(path));     // force express use this routr for static content (css, fonts, images)
app.use(methodOverride('_method'));           // force express use mthodOverride

app.get('/', (req, res) => {                  // create route on get (http verb + path + callback)
  res.json({ some: 'json' });                 // send json answer
});

app.post('/increment', (req, res) => {        // create route on post
  res.status(204).send();                     // set http status
  const qs = req.query;                       // object with query string
  res.send('<p>some html</p>');               // send string answer
});

// use template processor (path to template, options) in res.render
app.get('/', (req, res) => {
  res.render('index', { title: 'Hey', message: 'Hello there!' });
});
// html                                       // pug code example
//   head
//     title= title
//   body
//     h1= message

//- layout.pug                                // pug inheritance example
// html
//   head
//     title My Site - #{title}
//     block scripts
//       script(src='/jquery.js')
//   body
//     block content
//     block foot
//       #footer
//         p some footer content
//
// //- page-a.pug
// extends layout.pug                         // connect the layout
//
// append scripts                             // add some blocks to layout (default replace)
//   script(src='/pets.js')
//
// block content                              // fill block contents
//   h1= title
//   - const pets = ['cat', 'dog']
//   each petName in pets
//     h2= petName

// include <path file>                        // include some blocks from file

// Named routes example
app.get('/admin/users/:id', 'admin.user', (req, res) => {
  //  ... implementation
  // the names can also be accessed here:
  const url = app.namedRoutes.build('admin.user', { id: 2 }); // /admin/user/2
  // the name of the current route can be found at req.route.name
});
// And use it in HTML
// <a href=`${url('admin.user', { id: user.id })}`>edit</a>

// Dynamic routes example
// Route path: /users/:userId/books/:id
// Request URL: http://localhost:3000/users/34/books/8989
// req.params: { "userId": "34", "id": "8989" }
app.get('/users/:userId/books/:id', (req, res) => {
  const { userId, id } = req.params;            // you can get all dynamic routes from req.params
});

app.listen(3000, () => {                        // example of start application
  console.log('Example app listening on port 3000!');
});

// HTTP verbs
//
// app.get // Idempotent
// app.post
// app.delete // Idempotent
//
// Full update
// app.put // Idempotent
//
// Partial update
// app.patch // Idempotent
