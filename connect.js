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
const db = pgp(process.env.NODE_ENV === "production" ? proConfig : cn);

module.exports={
    app:app,
    db,db,
    express,express,
    PORT,PORT,
};