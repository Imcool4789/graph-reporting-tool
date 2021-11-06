const PORT = process.env.PORT || 5000;
const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
require("dotenv").config();
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
const express = require("express");
const app = express();
app.use(cors(corsOptions)); // Use this after the variable declaration
const path = require("path");
app.use(express.json());
var pgp = require("pg-promise")(/* options */);
//app.use(express.static(path.join(__dirname,"build"))); //uncomment if testing on non production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "build")));
}

const cn = {
  host: process.env.PG_HOST,
  port: process.env.PG_PORT,
  database: process.env.PG_DATABASE,
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  ssl: { rejectUnauthorized: false },
};
const proConfig = {
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
};
var db = pgp(process.env.NODE_ENV === "production" ? proConfig : cn);

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

app.post("/courseData", (req, res) => {
  db.any("SELECT * from student_program_mapping;")
    .then((rows) => {
      for (let i = 0; i < req.body.length; i++) {
        for (let j = 0; j < rows.length; j++) {
          if (req.body[i]["student_id"] === rows[j]["student_id"]) {
            req.body[i]["program_name"] = rows[j]["program_name"];
            delete req.body[i]["student_id"];
            break;
          }
        }
      }
      console.log(req.body)
      //db.any("Delete from f21_sysc4101_a VALUES")
      db.any("INSERT INTO f21_sysc4101_a (program_name, ga7_3, ga7_5, ga8_4, ga8_6, ga8_8) VALUES (" + req.body + ");")
        .then(() => {
          /**db.any("INSERT INTO f21_sysc4101_a VALUES (" + req.body + ");")
            .then(() => {})
            .catch((error) => {
              console.log(error);
            });
            **/
        })
        .catch((error) => {
          console.log(error);
        });
      res.json(req.body);
    })
    .catch((error) => {
      console.log(error);
    });
});
app.get("/testData", (req, res) => {
  db.any("SELECT * from f21_sysc4101_a;")
    .then((rows) => {
      res.json(rows);
    })
    .catch((error) => {
      console.log(error);
    });
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
