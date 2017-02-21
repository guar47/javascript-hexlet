import { get, post } from 'hexlet-http-request';

// BEGIN (write your solution here)
export default (statHost, updateHost) => new Promise((resolve, reject) => {
  get(statHost).then((res) => {
    const hosts = JSON.parse(res.data).map(obj => obj.url);
    const statuses = hosts.reduce((acc, host) => get(`${host}/status`).then(result => result.data), [])
  //  resolve(post(updateHost, { value: bestHost }));
  });
});
// END
