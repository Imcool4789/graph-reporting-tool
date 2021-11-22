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
  ssl: { rejectUnauthorized: false }
};
const proConfig = {
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }              
};
var db = pgp(process.env.NODE_ENV === "production" ? proConfig : cn);

app.get("/test", (req, res) => {
  db.any("SELECT * from student_attributes;")
    .then((rows) => {
      res.json(rows);
    })
    .catch((error) => {
      console.log(error);
    });
});

app.post("/adminSubmission", (req, res) => {
   let temp = [];
   var s;
  for (let i = 0; i < req.body.length; i++){
    console.log(req.body[i]);
    for (let key in req.body[i]) {
      if (key.toLowerCase().includes("year")) {
        temp.push(req.body[i][key]);
        console.log(req.body[i][key]);
      } else if(key.toLowerCase().includes("ga")) {
        temp.push(req.body[i][key]);
      } else if (key.toLowerCase().includes("course")){
        temp.push(req.body[i][key]);
      }
    }
  }
  var year = temp[0];
  var course = temp[1];
  temp.shift();
  temp.shift();
  temp.unshift(year + "_" + course);
  console.log(temp);
  var tableName = "_" + temp[0];
  var table = "CREATE TABLE " + tableName + " (id SERIAL PRIMARY KEY);";
  console.log(table);
  db.any(table)
    .then(() => {
      for (let i = 1; i < temp.length; i++){
        var add = "ALTER TABLE " + tableName + " ADD _" + temp[i] + " INTEGER;";
        console.log(add);
        db.any(add);
      }
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
      let dbName = "f21_sysc4101_a";
      db.any("Delete from " + dbName)
        .then(() => {
          let query = "INSERT INTO " + dbName + " (";
          let keys = Object.keys(req.body[0]);
          for (let i = 0; i < keys.length - 1; i++) {
            query += keys[i] + ",";
          }
          query += keys[keys.length - 1] + ") VALUES (";
          for (let i = 0; i < req.body.length; i++) {
            let tempQuery = query;
            for (let j = 0; j < keys.length - 1; j++) {
              if (keys[j] === "program_name") {
                tempQuery += "'" + req.body[i][keys[j]] + "',";
              } else {
                tempQuery += req.body[i][keys[j]] + ",";
              }
            }
            if (keys[keys.length-1] === "program_name") {
              tempQuery += "'" + req.body[i][keys[keys.length - 1]] + "');";
            } else {
              tempQuery += req.body[i][keys[keys.length - 1]] + ");";
            }
            db.any(tempQuery)
              .then(() => {})
              .catch((error) => {
                console.log(error);
              });
          }
        })
        .catch((error) => {
          console.log(error);
        });
      res.send(req.body);
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