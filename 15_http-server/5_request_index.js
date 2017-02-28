import fs from 'fs';
import path from 'path';

import makeServer from './3_request_server';

export default (port, callback = () => {}) => {
  fs.readFile(path.resolve(__dirname, 'phonebook.txt'), (err, data) => {
    if (err) {
      throw err;
    }
    // BEGIN (write your solution here)
    const usersField = data.toString().trim().split('\n');
    const users = usersField.reduce((obj, user) => {
      const userFields = user.trim().split('|').map(i => i.trim());
      return { ...obj, [userFields[0]]: { name: userFields[1], phone: userFields[2] } };
    }, {});
    // END
    const server = makeServer(users);
    server.listen(port, () => callback(server));
  });
};
