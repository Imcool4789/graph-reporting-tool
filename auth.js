const bcrypt = require("bcrypt");
const connect = require("./connect");
const db = connect.db;
const app = connect.app;
const express = connect.express;
const cookieParser = require("cookie-parser");
app.use(cookieParser());
const router = express.Router();
router.post("/register", (req, res) => {
  const body = req.body;
  const salt = bcrypt.genSaltSync(10);
  pass = bcrypt.hashSync(body.password, salt);
  db.any(
    "INSERT INTO secret(email, hash) values ('" +
      body.email +
      "','" +
      pass +
      "');"
  ).catch((error) => {
    console.error("Error:", error);
  });
});
router.post("/timestamp", (req, res) => {
  let subm = {};
  db.any("select email from secret where uid='" + body.sessionID + "';").then(
    (rows) => {
      subm = rows[0]["email"];
      subm = subm.replace(".", "");
      subm = subm.replace("@", "");
      db.any(
        "create table if not exists " +
          subm +
          " (id serial primary key, coursename varchar, timestamp varchar, message varchar)"
      ).then(() => {
        subm = rows[0]["email"];
        subm = subm.replace(".", "");
        subm = subm.replace("@", "");
        db.any("select coursename,timestamp from " + subm + ";").then(
          (rows) => {
            roles["timestamp"] = rows;
          }
        );
      });
    }
  );
});

router.post("/access", (req, res) => {
  const body = req.body;
  let roles = {};
  db.any(
    "create table if not exists instructors (id serial primary key, email varchar, course varchar, number integer, section varchar, year integer, term varchar);"
  ).then(() => {
    db.any(
      "create table if not exists departments (email VARCHAR PRIMARY KEY, dep_name VARCHAR);"
    ).then(() => {
      db.any(
        "select instructors.term,instructors.course,instructors.number,instructors.section,instructors.year from instructors,secret where uid='" +
          body.sessionID +
          "' and instructors.email=secret.email;"
      ).then((rows) => {
        roles["Instructor"] = rows;
        db.any(
          "select dep_name from departments,secret where uid='" +
            body.sessionID +
            "'and departments.email=secret.email;"
        ).then((rows) => {
          roles["Department Head"] = rows;
          db.any(
            "select 1 from admins,secret where uid='" +
              body.sessionID +
              "'and admins.email=secret.email;"
          ).then((rows) => {
            roles["Admin"] = rows;
            db.any(
              "select email from secret where uid='" + body.sessionID + "';"
            ).then((rows) => {
              subm = rows[0]["email"];
              subm = subm.replace(".", "");
              subm = subm.replace("@", "");
              roles["table"] = subm;
              db.any(
                "create table if not exists " +
                  subm +
                  " (id serial primary key, coursename varchar, timestamp varchar, message varchar);"
              ).then(() => {
                db.any("select coursename,timestamp from " + subm + ";")
                  .then((rows) => {
                    roles["timestamp"] = rows;
                  })
                  .then(() => {
                    res.json(roles);
                  });
              });
            });
          });
        });
      });
    });
  });
});
router.post("/compare", (req, res) => {
  const body = req.body;
  db.any("SELECT hash from secret where email ='" + body.email + "';")
    .then((rows) => {
      if (rows.length > 0) {
        var result = bcrypt.compareSync(body.password, rows[0].hash);
        if (result) {
          db.any(
            "update secret set uid ='" +
              req.sessionID +
              "' where email ='" +
              body.email +
              "';"
          );
          res.cookie("sessionID", req.sessionID);
          res.sendStatus(200);
        } else {
          res.sendStatus(403);
        }
      } else {
        res.sendStatus(403);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});

module.exports = router;
