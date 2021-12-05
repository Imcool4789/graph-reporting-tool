const { default: userEvent } = require("@testing-library/user-event");
const bcrypt = require("bcrypt");
const connect = require("./connect");
const db = connect.db;
const app = connect.app;
const PORT = connect.PORT;
const express = connect.express;

const router = express.Router();
router.post("/register", (req, res) => {
  const body = req.body;
  const salt = bcrypt.genSaltSync(10);
  pass = bcrypt.hashSync(body.password, salt);
  db.any(
    "INSERT INTO secret(email,hash) values ('" +
      body.email +
      "','" +
      pass +
      "');"
  ).catch((error) => {
    console.error("Error:", error);
  });
});
router.post("/compare", (req, res) => {
  const body = req.body;
  db.any("SELECT hash from secret where email ='" + body.email + "';")
    .then((rows) => {
      var result = bcrypt.compareSync(body.password, rows[0].hash);
      if (result) {
        console.log("Password correct");
      } else {
        console.log("Password wrong");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});

module.exports = router;
