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
      payload: {"text": "This is a line of text in a channel.\nAnd this is another line of text."}
      // payload: JSON.stringify({ text: payload.text })
    }).then(() => {
      callback(null, { statusCode: 204 });
    }).catch((e) => {
      callback(null, { statusCode: 500, body: "Internal Server Error: " + e });
    })
  } catch (e) {
    callback(null, { statusCode: 500, body: "Internal Server Error: " + e });
  }
}