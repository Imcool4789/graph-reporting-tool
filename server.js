const PORT = process.env.PORT || 5000;
require("dotenv").config();
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
const express = require("express");
const app = express();
const path=require("path")
app.use(express.json());
var pgp = require("pg-promise")(/* options */);
//app.use(express.static(path.join(__dirname,"build"))); uncomment if testing on non production
if(process.env.NODE_ENV==="production"){
  app.use(express.static(path.join(__dirname,"build")))
}

const cn = {
  host: process.env.PG_HOST,
  port: process.env.PG_PORT,
  database: process.env.PG_DATABASE,
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  ssl: { rejectUnauthorized: false }
};
const proConfig={
  connectionString:process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
}
var db = pgp(process.env.NODE_ENV==="production"?proConfig:cn);

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