// solution.js

import Express from 'express';
import bodyParser from 'body-parser';

import Post from './entities/Post';

export default () => {
  const app = new Express();
  app.set('view engine', 'pug');
  app.use(bodyParser.urlencoded({ extended: false }));

  let posts = [
    new Post('hello', 'how are your?'),
    new Post('nodejs', 'story about nodejs'),
  ];

  app.get('/', (req, res) => {
    res.render('index');
  });

  // BEGIN (write your solution here)
  app.get('/posts', (req, res) => {
    res.render('posts/index', { posts });
  });

  app.get('/posts/new', (req, res) => {
    res.render('posts/new', { form: {}, errors: {} });
  });

  app.get('/posts/:id', (req, res) => {
    const post = posts.find(post => post.id.toString() === req.params.id);
    res.render('posts/show', { post });
  });

    app.post('/posts', (req, res) => {
    const { title, body } = req.body;
    const errors = {};
    if (!title) {
      errors.title = "Can't be blank";
    }
    if (!body) {
      errors.body = "Can't be blank";
    }
    if (Object.keys(errors).length === 0) {
      const post = new Post(title, body);
      posts.push(post);
      res.redirect(`/posts/${post.id}`);
      return;
    }
    res.status(422);
    res.render('posts/new', { form: req.body, errors });
  });
  // END

  return app;
};

// Post.js

// BEGIN (write your solution here)
export default class Post {
  static id = 1;

  constructor(title, body) {
    this.id = Post.id++;
    this.title = title;
    this.body = body;
  }
}
// END

// index.pug
extends ../layouts/app.pug

block content
  div
    a(href='/') Main page
  // BEGIN (write your solution here)
  table
    each post in posts
      tr
        td
          a(href=`/posts/${post.id}`)= post.title
  br
  a(href='/posts/new') New Post
  // END

// new.pug
extends ../layouts/app.pug

block content
  // BEGIN (write your solution here)
  .row.mt-3
    .col-sm-6.mx-auto
      h3.text-xs-center New Blog Post
      form(action='/posts' method='post')
        .row.form-group
          .col-sm
            label.col-form-label
              | Title
              sup *
            input.form-control(name='title' value=form.title)
        .row.form-group
          .col-sm
            label.col-form-label
              | Body
              sup *
            textarea.form-control(rows=10 name='body')= form.body
        .form-group
          button.btn.btn-primary.btn-block(type='submit') Save
  // END

// show.pug
extends ../layouts/app.pug

block content
  div
    a(href='/') Main page
  // BEGIN (write your solution here)
  h3= post.title
  = post.body
  // END
