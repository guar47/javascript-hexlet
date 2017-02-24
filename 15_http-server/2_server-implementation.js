import fs from 'fs';
import path from 'path';
import http from 'http';

const server = (port, callback) => {
  // BEGIN (write your solution here)
  fs.readFile(path.resolve(__dirname, 'phonebook.txt'), (err, data) => {
    if (err) {
      throw err;
    }
    const users = data.toString().trim().split('\n');
    http.createServer((request, response) => {
      const messages = [
        'Welcome to The Phonebook',
        `Records count: ${Object.keys(users).length}`,
      ];
      response.end(messages.join('\n'));
    }).listen(port, callback);
  });
  // END
};

export default server;

server(4000);
