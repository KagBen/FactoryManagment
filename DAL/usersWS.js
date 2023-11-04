const axios = require("axios");

const getData = (url) => {
  return axios.get(url);
};

module.exports = { getData };
