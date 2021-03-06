const connect = require("./connect");
const db = connect.db;
const app = connect.app;
const PORT = connect.PORT;
const loginRoutes = require("./auth");
const session = require("express-session");
const uuid = require("uuid");
app.use(
  session({
    secret: "secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 8604000 },
    genid: function (req) {
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
app.post("/queryGA", (req, res) => {
  //FOR JOHN TODO
  console.log(req.body["programs"]);
  var x =
    "select table_name from information_schema.columns where column_name ~" +
    "'_" +
    req.body["GA"] +
    "_';";
  db.any(x)
    .then((table_name) => {
      res.json(table_name);
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
  var search =
    "SELECT * FROM " +
    temp[0] +
    temp[1] +
    " WHERE program_name = " +
    "'" +
    temp[2] +
    "';";
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
    "create table if not exists instructors (id serial primary key, email varchar, course varchar, number integer, section varchar, year integer, term varchar);";
  let temp1 = [];
  let temp2 = [];
  let temp3 = [];
  let temp4 = [];
  let temp5 = [];
  let temp6 = [];
  for (let i = 0; i < req.body.length; i++) {
    for (let key in req.body[i]) {
      if (key.toLowerCase().includes("email")) {
        temp1.push(req.body[i][key]);
      }
      if (key.toLowerCase().includes("term")) {
        temp2.push(req.body[i][key]);
      }
      if (key.toLowerCase().includes("year")) {
        temp3.push(req.body[i][key]);
      }
      if (key.toLowerCase().includes("course")) {
        temp4.push(req.body[i][key]);
      }
      if (key.toLowerCase().includes("number")) {
        temp5.push(req.body[i][key]);
      }
      if (key.toLowerCase().includes("section")) {
        temp6.push(req.body[i][key]);
      }
    }
  }
  db.any("drop table instructors;").then(() => {
    db.any(
      "create table if not exists instructors (id serial primary key, email varchar, course varchar, number integer, section varchar, year integer, term varchar);"
    ).then(() => {
      for (let i = 0; i < temp1.length; i++) {
        db.any(
          "Insert into secret(email) values('" +
            temp1[i] +
            "') on conflict (email) do nothing;"
        );
        db.any(
          "INSERT INTO instructors(email, term, year, course, number, section) VALUES (" +
            "'" +
            temp1[i] +
            "'" +
            "," +
            "'" +
            temp2[i] +
            "'" +
            "," +
            temp3[i] +
            "," +
            "'" +
            temp4[i] +
            "'" +
            "," +
            temp5[i] +
            "," +
            "'" +
            temp6[i] +
            "'" +
            ");"
        )
          .then(() => {
            subTable = temp1[i];
            subTable = subTable.replace(".", "");
            subTable = subTable.replace("@", "");
            db.any(
              "create table if not exists " +
                subTable +
                " (id serial primary key, coursename varchar unique, timestamp varchar, message varchar);"
            );
          })
          .then(() => {
            if (i == temp1.length - 1) {
              let unique = [...new Set(temp1)];
              for (let j = 0; j < unique.length; j++) {
                subTable = unique[j];
                subTable = subTable.replace(".", "");
                subTable = subTable.replace("@", "");
                db.any(
                  "insert into " +
                    subTable +
                    "(coursename) select concat('_',term,'_',year,'_',course,'_',number,'_',section,'_') from instructors where email='" +
                    unique[j] +
                    "' on conflict do nothing;"
                );
              }
            }
          });
      }
    });
  });
});

app.post("/adminDepartmentSubmission", (req, res) => {
  var x =
    "create table if not exists departments (email VARCHAR PRIMARY KEY, dep_name VARCHAR);";
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
    if (i == req.body.length - 1) {
      console.log(temp1);
      console.log(temp2);
      db.any("truncate table departments;");
      db.any(x).then(() => {
        for (let i = 0; i < temp1.length; i++) {
          db.any(
            "Insert into secret(email) values('" +
              temp1[i] +
              "') on conflict (email) do nothing;"
          );
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
    }
  }
});

app.post("/adminSubmission", (req, res) => {
  let temp = [];
  let term = [];
  let section = [];
  let number = [];
  let year = [];
  let course = [];
  let name = [];

  for (let i = 0; i < req.body.length; i++) {
    for (let key in req.body[i]) {
      if (key.toLowerCase().includes("term")) {
        term.push(req.body[i][key]);
      } else if (key.toLowerCase().includes("year")) {
        year.push(req.body[i][key]);
      } else if (key.toLowerCase().includes("course")) {
        course.push(req.body[i][key]);
      } else if (key.toLowerCase().includes("number")) {
        number.push(req.body[i][key]);
      } else if (key.toLowerCase().includes("section")) {
        section.push(req.body[i][key]);
      } else if (key.toLowerCase().includes("ga")) {
        temp.push(req.body[i][key]);
      }
    }
  }

  for (let i = 0; i < temp.length; i++) {
    temp[i] = temp[i].toString().replace(".", "_");
    console.log(temp[i]);
  }

  for (let i = 0; i < term.length; i++) {
    name[i] =
      "_" +
      term[i] +
      "_" +
      year[0] +
      "_" +
      course[0] +
      "_" +
      number[0] +
      "_" +
      section[i] +
      "_";
  }

  for (let i = 0; i < name.length; i++) {
    var table =
      "CREATE TABLE " +
      name[i] +
      " (id SERIAL PRIMARY KEY, program_name VARCHAR);";
    db.any(table).then(() => {
      for (let i = 0; i < name.length; i++) {
        for (let j = 0; j < temp.length; j++) {
          var add = "ALTER TABLE " + name[i] + " ADD _" + temp[j] + " INTEGER;";
          db.any(add);
        }
      }
    });
  }
});

app.post("/courseData", (req, res) => {
  db.any("SELECT * from student_program_mapping;")
    .then((rows) => {
      let data = req.body["0"];
      for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < rows.length; j++) {
          if (data[i]["student_id"] === rows[j]["student_id"]) {
            data[i]["program_name"] = rows[j]["program_name"];
            delete data[i]["student_id"];
            break;
          }
        }
      }
      let tname = req.body["tName"];
      let courseName = req.body["course"];
      let message = req.body["message"];

      tUpdate =
        "update " +
        tname +
        " set timestamp='" +
        Date.now() +
        "' where coursename='" +
        courseName +
        "_';";

      // tUpdate =
      //   tUpdate.slice(0, tUpdate.length - 1) +
      //   "_';" +
      //   tUpdate.slice(tUpdate.length - 1);
      console.log(tUpdate);
      db.any(tUpdate).catch((error) => {
        console.log(error);
        res.sendStatus(403);
      });
      var mUpdate =
        "update " +
        tname +
        " set message='" +
        message +
        "' where coursename='" +
        courseName +
        "_';";

      // mUpdate =
      //   mUpdate.slice(0, mUpdate.length - 1) +
      //   "_';" +
      //   mUpdate.slice(mUpdate.length - 1);
      console.log(mUpdate);
      db.any(mUpdate).catch((error) => {
        console.log(error);
        res.sendStatus(403);
      });
      var trun = "truncate table " + courseName + "_;";
      // var leng = trun.length;
      // trun = trun.slice(0, leng - 1) + "_;" + trun.slice(leng - 1);
      console.log(trun);
      db.any(trun)
        .then(() => {
          var query = "INSERT INTO " + courseName + "_ (";
          // query =
          //   query.slice(0, query.length - 1) +
          //   "_ (" +
          //   query.slice(query.length - 1);
          console.log(query);
          let keys = Object.keys(data[0]);
          for (let i = 0; i < keys.length - 1; i++) {
            query += keys[i] + ",";
          }
          query += keys[keys.length - 1] + ") VALUES (";
          for (let i = 0; i < data.length; i++) {
            let tempQuery = query;
            for (let j = 0; j < keys.length - 1; j++) {
              if (keys[j] === "program_name") {
                tempQuery += "'" + data[i][keys[j]] + "',";
              } else {
                tempQuery += data[i][keys[j]] + ",";
              }
            }
            if (keys[keys.length - 1] === "program_name") {
              tempQuery += "'" + data[i][keys[keys.length - 1]] + "');";
            } else {
              tempQuery += data[i][keys[keys.length - 1]] + ");";
            }
            db.any(tempQuery).catch((error) => {
              console.log(error);
              res.sendStatus(403);
            });
          }
        })
        .then(() => {
          res.send(data);
        })
        .catch((error) => {
          console.log(error);
          res.sendStatus(403);
        });
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(403);
    });
});

app.post("/courseSubmission", (req, res) => {
  var pLength = 0;
  var cLength = 0;
  var program = "";
  let x = {};
  let z = {};
  let allGA = [];
  var tempGA;
  var GA;
  var iter = 0;
  let courses = [];

  for (let i = 0; i < req.body.length; i++) {
    if (req.body[i].hasOwnProperty("program")) {
      pLength++;
    } else if (req.body[i].hasOwnProperty("tablename")) {
      cLength++;
    } else {
      GA = req.body[i]["GA"];
    }
  }

  for (let i = 0; i < pLength; i++) {
    if (i == 0) {
      program += " where ";
    }
    program += "program_name='" + req.body[i]["program"] + "'";
    if (i + 1 != pLength) {
      program += " or ";
    }
  }

  for (let i = pLength + 1; i < req.body.length; i++) {
    courses[i - (pLength + 1)] = req.body[i]["tablename"];
  }

  for (let i = 0; i < courses.length; i++) {
    temp =
      "select column_name from information_schema.columns where table_name='" +
      courses[i] +
      "' and column_name~'_" +
      GA +
      "_';";
    db.any(temp).then((rows) => {
      x[courses[i]] = rows;
      for (let j = 0; j < rows.length; j++) {
        allGA[iter] = rows[j]["column_name"];
        iter++;
        tempGA += "," + rows[j]["column_name"];
        tempGA = tempGA.replace("undefined", "");

        if (j == rows.length - 1) {
          console.log(
            "select program_name" +
              tempGA +
              " from " +
              courses[i] +
              program +
              ";"
          );
          db.any(
            "select program_name" +
              tempGA +
              " from " +
              courses[i] +
              program +
              ";"
          )
            .then((columns) => {
              z[courses[i]] = columns;
            })
            .then(() => {
              if (courses.every((r) => Object.keys(z).includes(r))) {
                let unique = [...new Set(allGA)];
                z["GAS"] = unique;
                z["Courses"] = courses;
                console.log(z);
                res.json(z);
              }
            });

          tempGA = "";
        }
      }
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
