const express = require("express");
const router = express.Router();
const axios = require("axios");
const request = require("request");
const sendSMS = require("../apis/sendSMS");
const callNumber = require("../apis/callNumber");
var moment = require("moment");
require("dotenv").config();

router.get("/searchVaccine/:districtId", async (req, res, next) => {
  let districtId = req.params.districtId;
  let currentDate = moment().format("DD-MM-YYYY");
  try {
    request(
      `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=${districtId}&date=${currentDate}`,
      function (error, response, body) {
        if (!error && response.statusCode == 200) {
          let bodyObj = JSON.parse(body);
          console.log(bodyObj)
          //res.json(bodyObj);
          var { centers } = bodyObj;
          res.json(centers);
          if (Array.isArray(centers)) {
            centers.forEach(function (center, centerIndex) {
              //console.log("*************");
              let { sessions } = center;
              //console.log(sessions);
              if (Array.isArray(sessions)) {
                sessions.forEach(function (session, sessionIndex) {
                  if (
                    session.available_capacity > 0 &&
                    session.min_age_limit < 45
                  ) {
                    console.log(session);
                    sendSMS(
                      process.env.TONUMBER,
                      `VAccine are aviable book it fast for ${centers.fee_type}!!!`
                    );
                    callNumber(process.env.TONUMBER);
                  }
                });
                //console.log("**************");
              }
            });
          }
        }
      }
    );
  } catch (err) {
    next(err);
  }
});

router.get("/getVaccineStatus", async (req, res) => {
  try {
    const response = await axios.get(
      "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=725&date=09-05-2021"
    );
    console.log(response);
    res.send(response.data);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "error",
      data: err,
    });
  }
});

module.exports = router;
