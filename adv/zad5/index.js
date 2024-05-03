const express = require("express");
const app = express();

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("pages/index");
});

const pgp = require("pg-promise")(/* options */);
const db = pgp("postgres://sebas@localhost:5432/sebas");

db.one("SELECT $1 AS value", 123)
  .then((data) => {
    console.log("DATA:", data.value);
  })
  .catch((error) => {
    console.log("ERROR:", error);
  });

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
