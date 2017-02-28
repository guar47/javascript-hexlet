import http from 'http';
import url from 'url';
import querystring from 'querystring';

export default users => http.createServer((request, response) => {
  request.on('error', err => {
    console.error(err.stack);
  });
  request.on('end', () => {
    if (request.url === '/') {
      const messages = [
        'Welcome to The Phonebook',
        `Records count: ${Object.keys(users).length}`,
      ];
      response.end(messages.join('\n'));
    } else if (request.url.startsWith('/search.json')) {
      response.setHeader('Content-Type', 'application/json');
      const { query } = url.parse(request.url);
      const { q } = querystring.parse(query);
      const normalizedSearch = q ? q.trim().toLowerCase() : '';

      const result = Object.keys(users)
        .filter(id => users[id].name.toLowerCase().includes(normalizedSearch))
        .map(id => users[id]);

      response.end(JSON.stringify(result));
    } else if (request.url.startsWith('/users.json')) {
      // BEGIN (write your solution here)
      response.setHeader('Content-Type', 'application/json');
      const { query } = url.parse(request.url);
      const { page = 1, perPage = 10 } = querystring.parse(query);
      const totalPages = Math.ceil(Object.keys(users).length / perPage);
      const data = Object.keys(users)
        .filter(id => id > perPage * (page - 1) && id <= perPage * page)
        .map((id) => {
          return { name: users[id].name, phone: users[id].phone };
        });
      const result = { meta: { page, perPage, totalPages }, data };

      response.end(JSON.stringify(result));
      // END
    }
  });
  request.resume();
});
