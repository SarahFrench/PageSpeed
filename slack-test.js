var Slack = require('slack-node');

webhookUri = "https://hooks.slack.com/services/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";

slack = new Slack();
slack.setWebhook(webhookUri);

slack.webhook({
  channel: "#@sarah.french",
  username: "PageSpeedBot",
  text: "This is posted to Sarah French and comes from a bot named PageSpeedBot."
}, function(err, response) {
  console.log(response);
});
