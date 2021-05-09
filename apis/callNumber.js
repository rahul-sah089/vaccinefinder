const accountSid = "AC128537683e0b40c844e728631594e8d4";
const authToken = "cc820ba214d3e59655060e2ed4c4d0f6";
const client = require("twilio")(accountSid, authToken);

const callNumber = (to, body) => {
  client.calls
    .create({
      twiml: "<Response><Say>Ahoy, World!</Say></Response>",
      to,
      from: "+14434291242",
    })
    .then(call => console.log(call.sid))
    .catch(error => console.log(error));
};

module.exports = callNumber;
