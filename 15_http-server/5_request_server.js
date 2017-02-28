import http from 'http';
import url from 'url';
import querystring from 'querystring';

export default users => http.createServer((request, response) => {
  request.on('end', () => {
    if (request.url === '/') {
      const messages = [
        'Welcome to The Phonebook',
        `Records count: ${Object.keys(users).length}`,
      ];
      response.end(messages.join('\n'));
    } else if (request.url.startsWith('/search')) {
      // BEGIN (write your solution here)
      const searchSubstring = querystring.parse(url.parse(request.url).query).q;
      const people = Object.values(users);
      const result = people
        .filter(user => (user.name.toLowerCase().indexOf(searchSubstring.toLowerCase()) + 1))
        .map(user => `${user.name}, ${user.phone}`);
      response.end(result.join('\n'));
      // END
    }
  });

  request.resume();
});
