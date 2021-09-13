const PORT = process.env.PORT || 5000;
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
const app = express();
const express = require("express");
const cors = require("cors")
const path=require("path")
app.use(cors());
app.use(express.json());
var pgp = require("pg-promise")(/* options */);

if(process.env.NODE_ENV==="production"){
  app.use(express.static(path.join(__dirname,"build")))
}

const cn = {
  host: "ec2-44-195-201-3.compute-1.amazonaws.com",
  port: 5432,
  database: "d33iv92dpje1nr",
  user: "aaoktvatfizxkf",
  password: "6fa67b9ca6288d72c46a129b5a4c4599992a38c796a50ba300d53aa3ca4d40c2",
  ssl: true,
};
var db = pgp(cn);

app.get("/test", (req, res) => {
  db.any("SELECT * from student_attributes;")
    .then((rows) => {
      console.log(rows);
      res.json(rows);
    })
    .catch((error) => {
      console.log(error);
    });
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});