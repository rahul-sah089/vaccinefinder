require("dotenv").config();
const accountSid = process.env.ACCOUNTSID;
const authToken = process.env.AUTHTOKEN;
const client = require("twilio")(accountSid, authToken);

const sendSMS = (to, body) => {
  client.messages
    .create({
      body,
      from: process.env.FROMNUMBER,
      to,
    })
    .then(message => console.log(message.sid))
    .catch(error => console.log(error));
};

module.exports = sendSMS;
