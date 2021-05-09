require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const router = require("./routes/vacrouter");
const cors = require("cors");
const request = require("request");


const app = express();

app.use(cors());
app.use(morgan("dev"));

app.use((req, res, next) => {
  console.log("This is the middleware");
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", router);

const PORT = process.env.PORT || 3000;

const cron = require("node-cron");

//Call every one min
cron.schedule("* * * * *", function () {
  console.log("running a task every minute");
  request(
    `http://localhost:${process.env.PORT}/api/v1/searchVaccine/725`,
    function (error, response, body) {
      if (!error) {
        console.log(body);
      } else {
        console.log(error);
      }
    }
  );
});

app.listen(PORT, () => {
  console.log(`server is up.. listening to port ${PORT}`);
});
