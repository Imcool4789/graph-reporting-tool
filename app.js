process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
const express = require('express')
const app = express()
const port = 3000

var pgp = require('pg-promise')(/* options */)
const cn ={
    host: 'ec2-44-195-201-3.compute-1.amazonaws.com',
    port: 5432,
    database: 'd33iv92dpje1nr',
    user: 'aaoktvatfizxkf',
    password: '6fa67b9ca6288d72c46a129b5a4c4599992a38c796a50ba300d53aa3ca4d40c2',
    ssl:true
}
var db = pgp(cn)
app.get('/', (req, res) => {
  db.any("SELECT * from student_graduate_attributes;")
  .then (rows=>{
      console.log(rows);
      res.json(rows)
  })
  .catch(error=>{
      console.log(error)
  })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})