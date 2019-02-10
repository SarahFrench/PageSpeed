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

function getPageSpeedStat(stats){
  return new Promise ((resolve, reject) => {
    let metrics = stats.lighthouseResult.audits['metrics']['details']['items'][0];
    let firstCPUIdle = metrics.firstCPUIdle;
    resolve(firstCPUIdle)
  })
}

// Returns one page speed request stat
  getPageStats()
    .then(stats => {
      return getPageSpeedStat(stats)
    })
    .then(speed => {
      let message = `Page speed of https://www.mumsnet.com was just measured as ${speed}ms`
      postMessage(setWebhook(WEBHOOK_SARAH_FRENCH), message)
    })
