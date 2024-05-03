const express = require("express");
const app = express();

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  db.any("SELECT * FROM computer_names")
    .then((data) => {
      res.render("pages/index", { items: data });
    })
    .catch((error) => {
      console.log("ERROR:", error);
    });
});

const pgp = require("pg-promise")(/* options */);
const db = pgp("postgres://sebas@localhost:5432/sebas");

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
