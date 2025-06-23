const { httpGet } = require('./mock-http-interface');

// transform result of http call into 
// required message format object
const wrapper = async (url) => 
  httpGet(url).then(({ status, body }) => {
    const key = (status === 200) ? 'Arnie Quote' : 'FAILURE';
    const { message } = JSON.parse(body);
    return { [key]: message };
  });

const getArnieQuotes = async (urls) => {
  // map http to an array of promises 
  const pending = urls.map(wrapper);

  // return array of promises that resolve
  // to results array of messages in the
  // required object format
  return Promise.all(pending);
};

module.exports = {
  getArnieQuotes,
};
