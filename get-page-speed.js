const request = require('request');
const fs = require('fs');

const API_KEY = require('./API-key.js').API;
const BASE_URL = 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed';

// request(`${BASE_URL}?url=https%3A%2F%2Fwww.mumsnet.com&category=performance&locale=UK&key=${API_KEY}`,
request(`https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=https://developers.google.com`,
   (error, response, body) => {
     console.log(JSON.parse(response.body.loadingExperience.metrics));
     fs.writeFile("response.json", JSON.parse(response.body), function(error) {
      if(error) {
        return console.log(error);
      }
      console.log("The file was saved!");
    });
   });
