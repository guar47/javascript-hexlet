// BEGIN (write your solution here)
const prepareData = (data, headers) => {
  if (data === undefined) {
    return [data, headers];
  }
  const preparedData = querystring.stringify(data);
  const bufferData = new Buffer(preparedData, 'utf-8');
  return [bufferData, {
    ...headers,
    'Content-Type': 'application/x-www-form-urlencoded',
    'Content-Length': Buffer.byteLength(bufferData),
  }];
};

export default config => {
  const [data, headers] = prepareData(config.data, config.headers || {});

  const urlObject = url.parse(config.url, true);
  const search = getSearch(urlObject.query, config.params);

  const options = {
    hostname: urlObject.hostname,
    port: urlObject.port,
    method: config.method,
    path: `${urlObject.pathname}${search}`,
    headers,
  };

  return new Promise((resolve, reject) => {
    const req = http.request(options, res => {
      const response = {
        status: res.statusCode,
        statusText: res.statusMessage,
        headers: res.headers
      };

      const responseData = [];
      res.on('data', (chunk) => {
        responseData.push(chunk.toString());
      });

      res.on('error', err => {
        reject(err);
      });

      res.on('end', () => {
        response.data = responseData.join('');
        resolve(response);
      });
    });

    req.on('error', err => {
      reject(err);
    });

    req.end(data);
  });
};
// END
