const axios = require("axios");

const cowinFinder = axios.create({
  baseUrl: "https://cdn-api.co-vin.in/api/v2",
});

module.exports =  cowinFinder;
