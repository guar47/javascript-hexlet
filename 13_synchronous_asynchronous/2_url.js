import url from 'url';

// BEGIN (write your solution here)
import qs from 'querystring';
export default (address, newParams) => {
  if (newParams === undefined) {
    return address;
  }
  const urlParsed = url.parse(address);
  const queryString = qs.parse(urlParsed.query);
  const keys = Object.keys(newParams).concat(Object.keys(queryString));
  const newQueryString = keys.reduce((acc, property) => {
    if (newParams[property] === null) {
      return acc;
    } else if (queryString[property] !== undefined && newParams[property] === undefined) {
      return { ...acc, [property]: queryString[property] };
    } return { ...acc, [property]: newParams[property] };
  }, {});
  const newUrl = {
    query: newQueryString,
    pathname: urlParsed.pathname,
  }
  return url.format(newUrl);
};
// END
