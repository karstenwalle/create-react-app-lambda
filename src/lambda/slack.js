const fetch = require("node-fetch");
const slackURL = process.env.SLACK_WEBHOOK_URL;
export function handler(event, context, callback) {
  if (event.httpMethod !== "POST") {
    return callback(null, { statusCode: 410, body: "Unsupported Request Method" });
  }
  try {
    const payload = JSON.parse(event.body);
    fetch(slackURL, {
      method: "POST",
      body: { text: JSON.parse(event.body).text }
    }).then(() => {
      callback(null, { statusCode: 204 });
    }).catch((eg) => {
      callback(null, { statusCode: 500, body: "Internalff Server Error: " + eg });
    })
  } catch (ef) {
    callback(null, { statusCode: 500, body: "Internalee Server Error: " + "1" + JSON.parse(event.body).text + "2" + payload + "|-|" + payload.text + "||" + ef });
  }
}