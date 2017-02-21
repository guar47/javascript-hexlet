import { get, post } from 'hexlet-http-request';

// BEGIN (write your solution here)
export default (backendsListUrl, setCurrentBackendUrl) => get(backendsListUrl)
  .then((result) => {
    const data = JSON.parse(result.data);
    const promises = data.map(({ url }) => get(`${url}/status`));

    return Promise.all(promises);
  })
  .then((responses) => {
    const values = responses.map(v => JSON.parse(v.data))
      .sort((v1, v2) => v1.workload - v2.workload);
    const best = values[0];
    return post(setCurrentBackendUrl, { value: best.url });
  });
// END
