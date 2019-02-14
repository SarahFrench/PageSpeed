const request = require('request');
const fs = require('fs');

const API_KEY = require('./API-key.js').API_KEY;
const BASE_URL = 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed';

request(`${BASE_URL}?url=https%3A%2F%2Fwww.mumsnet.com&category=performance&locale=UK&key=${API_KEY}`,
   (error, response, body) => {
     let stats = JSON.parse(response.body);
     let metrics = stats.lighthouseResult.audits['metrics']['details']['items'][0];
     let firstCPUIdle = metrics.firstCPUIdle;
     fs.writeFile("response.json", JSON.stringify(stats), function(error) {
      if(error) {
        return console.log(error);
      }
      console.log("The file was saved!");
    });
   });
