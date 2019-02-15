# PageSpeedMonitor

# APIs used:
- Google's PageSpeed Insights API: https://developers.google.com/speed/pagespeed/insights/
- Slack API: https://api.slack.com/

# Progress:

**DONE:**

- Use Google PageInsights API to get page speed info about Mumsnet website
- Use Stitch API to post messages to Stitch
- Combine the above using Promises - post page speed result to Slack channel



**TO DO:**

- Use setTimeout to space out multiple calls to the PageInsights API, so an average pagespeed value can be calculated
- CRON Job : https://scotch.io/tutorials/nodejs-cron-jobs-by-examples



**WHAT WOULD BE COOL:**

- Making a Slack bot that reports pagespeed in a way comparable to the metrics reported by Jason (the sub 4 second measurement)
  - OR:
  - Slack bot take info out of Snowflake/wherever data collected by MN is kept
- Have a page speed Slack channel? Where people can go to see updates?
- Have a bot that can tell you different metrics/info depending on the messages you send to it
- Triggered to closely monitor changes by new merges to master in MN github repos?
