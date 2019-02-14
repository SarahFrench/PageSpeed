const request = require('request');
const Slack = require('slack-node');

const WEBHOOK_SARAH_FRENCH = require('./webHooks.js').WEBHOOK_SARAH_FRENCH;
const API_KEY = require('./API-key.js').API_KEY;
const BASE_URL = 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed';

function setWebhook(webhookUri){
  let slack = new Slack();
  slack.setWebhook(webhookUri);
  return slack
}

function postMessage(slack, message){
  slack.webhook({
    channel: "#@sarah.french",
    username: "PageSpeedBot",
    as_user: false,
    text: `${message}`
  }, function(err, response) {
    // console.log(response);
    if (err){
      console.log(err);
    }
  });
}

function getPageStats(){
  return new Promise ((resolve, reject) => {
    request(`${BASE_URL}?url=https%3A%2F%2Fwww.mumsnet.com&category=performance&locale=UK&key=${API_KEY}`,
       (error, response, body) => {
         let stats = JSON.parse(response.body);
         resolve(stats)
         reject(error)
    });
  });
}

function getFirstCPUIdle(stats){
  return new Promise ((resolve, reject) => {
    let metrics = stats.lighthouseResult.audits['metrics']['details']['items'][0];
    let firstCPUIdle = metrics.firstCPUIdle;
    resolve(firstCPUIdle)
  })
}

function getFirstContentfulPaint(stats){
  return new Promise ((resolve, reject) => {
    let firstContentfulPaint = stats.loadingExperience["metrics"]["FIRST_CONTENTFUL_PAINT_MS"]["percentile"];
    resolve(firstContentfulPaint)
  })
}

// Returns one page speed request stat
  getPageStats()
    .then(stats => {
      return Promise.all([getFirstContentfulPaint(stats), getFirstCPUIdle(stats)])
    })
    .then(speed => {
      speedOfFCP = speed[0]/1000;
      speedOfFirstCPUIdle = speed[1]/1000;
      let message = `In 90% of users visits to https://www.mumsnet.com, First Contentful Paint took \`${speedOfFCP}\` seconds or fewer. \nIn lab tests, the CPU became idle in \`${speedOfFirstCPUIdle}\` seconds`
      postMessage(setWebhook(WEBHOOK_SARAH_FRENCH), message)
    })
