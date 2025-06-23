const { httpGet } = require('./mock-http-interface');

const getArnieQuotes = async (urls) => {
  // TODO: Implement this function.
  // return results;
  const results = [];
  const pending = [];

  urls.forEach(url => {
    const data = httpGet(url);
    pending.push(data);
  });

  const arr = await Promise.all(pending);

  arr.forEach(({ status, body}) => {
    const { message } = JSON.parse(body);
    if (status === 200) {    
      results.push({'Arnie Quote': message})
    } else {
      results.push({'FAILURE': message })
    }
  });
  return results;
};

module.exports = {
  getArnieQuotes,
};
