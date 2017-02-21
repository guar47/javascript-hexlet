import url from 'url';
import http from 'http';

const getTitle = body => body.match(/<h1>(.*?)<\/h1>/)[1];
const getLinks = body =>
  (body.match(/href="\/(.*?)">/g) || [])
    .map(item => item.match(/href="\/(.*?)">/)[1]);

// BEGIN (write your solution here)
export default (expectedTitle, link, callback) => {
  const { protocol, hostname, pathname, port } = url.parse(link);
  const search = (waited, visited) => {
    if (waited.length === 0) {
      callback(new Error('link was not found'));
      return;
    }
    const [current, ...rest] = waited;
    const body = [];

    const address = url.format(
      { protocol, hostname, port, pathname: current });
    http.get(address, res => {
      res.on('data', chunk => {
        body.push(chunk.toString());
      }).on('end', () => {
        const data = body.join();
        const actualTitle = getTitle(data);
        if (expectedTitle === actualTitle) {
          callback(null, address);
          return;
        }
        const newLinks = getLinks(data);
        const newWaitedLinks = newLinks.filter(l => !visited.has(l));
        visited.add(current);
        search([...newWaitedLinks, ...rest], visited);
      });
    });
  };

  search([pathname], new Set());
};
// END
