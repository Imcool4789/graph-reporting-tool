const connect = require("./connect");
const db = connect.db;
const app = connect.app;
const PORT = connect.PORT;
const loginRoutes = require("./auth");
const session = require("express-session");
const uuid =require("uuid");
app.use(
  session({
    secret: "secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 8604000 },
    genid:function(req){
      return uuid.v4();
    },
  })
);
app.use("/auth", loginRoutes);
app.get("/test", (req, res) => {
  db.any("SELECT * from student_attributes;")
    .then((rows) => {
      res.json(rows);
    })
    .catch((error) => {
      console.log(error);
    });
});
app.post("/adminGA", (req, res) => {
  let temp = [];
  for (let i = 0; i < req.body.length; i++) {
    for (let key in req.body[i]) {
      if (key.toLowerCase().includes("ga")) {
        temp.push(req.body[i][key]);
      }
    }
  }
  var x = temp[0];
  console.log(x);
  var search =
    "select distinct table_name from information_schema.columns where column_name ~ " +
    "'^" +
    x +
    "';";
  db.any(search)
    .then((rows) => {
      res.json(rows);
    })
    .catch((error) => {
      console.log(error);
    });
});

app.post("/adminShowYear", (req, res) => {
  let temp = [];
  for (let i = 0; i < req.body.length; i++) {
    for (let key in req.body[i]) {
      if (key.toLowerCase().includes("year")) {
        temp.push(req.body[i][key]);
      }
    }
  }
  var x = temp[0];
  console.log(x);
  var search =
    "select distinct table_name from information_schema.tables where table_name ~ " +
    "'^" +
    x +
    "';";
  db.any(search)
    .then((rows) => {
      res.json(rows);
    })
    .catch((error) => {
      console.log(error);
    });
});

app.post("/adminShowYearCourses", (req, res) => {
  let temp = [];
  for (let i = 0; i < req.body.length; i++) {
    for (let key in req.body[i]) {
      if (key.toLowerCase().includes("course")) {
        temp.push(req.body[i][key]);
      }
    }
  }
  var x = temp[0];
  console.log(x);
  var search =
    "select distinct table_name from information_schema.tables where table_name ~ " +
    "'" +
    x +
    "';";
  db.any(search)
    .then((rows) => {
      res.json(rows);
    })
    .catch((error) => {
      console.log(error);
    });
});

app.post("/adminShowProgram", (req, res) => {
  let temp = [];
  for (let i = 0; i < req.body.length; i++) {
    for (let key in req.body[i]) {
      if (key.toLowerCase().includes("year")) {
        temp.push(req.body[i][key]);
      }
      if (key.toLowerCase().includes("course")) {
        temp.push(req.body[i][key]);
      }
      if (key.toLowerCase().includes("program")) {
        temp.push(req.body[i][key]);
      }
    }
  }
  //var x = temp[0];
  console.log(temp);
  var search =
    "SELECT * FROM " +
    temp[0] +
    temp[1] +
    " WHERE program_name = " +
    "'" +
    temp[2] +
    "';";
  console.log(search);
  db.any(search)
    .then((rows) => {
      res.json(rows);
    })
    .catch((error) => {
      console.log(error);
    });
});

app.post("/departmentSubmission", (req, res) => {
  var x =
    "CREATE TABLE " +
    "instructors " +
    "(email VARCHAR PRIMARY KEY, course VARCHAR, section VARCHAR);";
  let temp1 = [];
  let temp2 = [];
  let temp3 = [];
  for (let i = 0; i < req.body.length; i++) {
    for (let key in req.body[i]) {
      if (key.toLowerCase().includes("email")) {
        temp1.push(req.body[i][key]);
      }
      if (key.toLowerCase().includes("course")) {
        temp2.push(req.body[i][key]);
      }
      if (key.toLowerCase().includes("section")) {
        temp3.push(req.body[i][key]);
      }
    }
  }
  db.any(x).then(() => {
    for (let i = 0; i < temp1.length; i++) {
      db.any(
        "INSERT INTO instructors(email, course, section) VALUES (" +
          "'" +
          temp1[i] +
          "'" +
          "," +
          "'" +
          temp2[i] +
          "'" +
          "," +
          "'" +
          temp3[i] +
          "'" +
          ");"
      );
    }
  });
});

app.post("/adminDepartmentSubmission", (req, res) => {
  var x =
    "CREATE TABLE " +
    "departments " +
    "(email VARCHAR PRIMARY KEY, dep_name VARCHAR);";
  let temp1 = [];
  let temp2 = [];

  for (let i = 0; i < req.body.length; i++) {
    for (let key in req.body[i]) {
      if (key.toLowerCase().includes("email")) {
        temp1.push(req.body[i][key]);
      }
      if (key.toLowerCase().includes("dep_name")) {
        temp2.push(req.body[i][key]);
      }
    }
  }
  db.any(x).then(() => {
    for (let i = 0; i < temp1.length; i++) {
      db.any(
        "INSERT INTO departments(email, dep_name) VALUES (" +
          "'" +
          temp1[i] +
          "'" +
          "," +
          "'" +
          temp2[i] +
          "'" +
          ");"
      );
    }
  });
});

app.post("/adminSubmission", (req, res) => {
  let temp = [];
  var s;
  for (let i = 0; i < req.body.length; i++) {
    for (let key in req.body[i]) {
      if (key.toLowerCase().includes("year")) {
        temp.push(req.body[i][key]);
      } else if (key.toLowerCase().includes("ga")) {
        temp.push(req.body[i][key]);
      } else if (key.toLowerCase().includes("course")) {
        temp.push(req.body[i][key]);
      }
    }
  }
  var year = temp[0];
  var course = temp[1];
  temp.shift();
  temp.shift();
  temp.unshift(year + "_" + course);
  var tableName = "_" + temp[0];
  var table =
    "CREATE TABLE " +
    tableName +
    " (id SERIAL PRIMARY KEY, program_name VARCHAR);";
  db.any(table).then(() => {
    for (let i = 1; i < temp.length; i++) {
      var add = "ALTER TABLE " + tableName + " ADD _" + temp[i] + " INTEGER;";
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
            if (keys[keys.length - 1] === "program_name") {
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
