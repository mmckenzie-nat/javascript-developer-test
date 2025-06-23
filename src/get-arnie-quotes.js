const { httpGet } = require('./mock-http-interface');

const wrapper = async (url) => 
  httpGet(url).then(({ status, body }) => {
    const key = (status === 200) ? 'Arnie Quote' : 'FAILURE';
    const { message } = JSON.parse(body);
    return { [key]: message };
  });

const getArnieQuotes = async (urls) => {
  const pending = [];
  urls.forEach(url => {
    const data = wrapper(url);
    pending.push(data)
  });
  return Promise.all(pending);
};

module.exports = {
  getArnieQuotes,
};
