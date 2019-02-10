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
    text: "This is posted to Sarah French and comes from a bot named PageSpeedBot."
  }, function(err, response) {
    console.log(response);
  });
}

function getPageStats(){
  return new Promise ((resolve, reject) => {
    request(`${BASE_URL}?url=https%3A%2F%2Fwww.mumsnet.com&category=performance&locale=UK&key=${API_KEY}`,
       (error, response, body) => {
         let stats = JSON.parse(response.body);
         // let metrics = stats.lighthouseResult.audits['metrics']['details']['items'][0];
         // let firstCPUIdle = metrics.firstCPUIdle;
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

Promise.all([getPageStats(), getPageStats()])
  .then(data =>{
    let speeds = [];
    data.forEach( stats => {
      speeds.push(getPageSpeedStat(stats));
    })
    return speeds
  })
  .then(speeds => {
    console.log(speeds);
  })

// Returns one page speed request stat
  // getPageStats()
  //   .then(stats => {
  //     return getPageSpeedStat(stats)
  //   })
  //   .then(speed => {
  //     console.log(speed)
  //   })
