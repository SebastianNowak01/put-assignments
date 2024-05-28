const express = require("express");
const app = express();
const session = require("express-session");
const pgp = require("pg-promise")();
const db = pgp("postgres://sebas@localhost:5432/sebas");
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "secret-key",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  }),
);
app.use(cookieParser());
app.set("view engine", "ejs");

let GAMES = [];

app.get("/", (req, res) => {
  db.any("SELECT * FROM computer_names")
    .then((data) => {
      GAMES = [...data];
      console.log(GAMES);
      res.render("pages/index", { items: GAMES });
    })
    .catch((error) => {
      console.log("ERROR:", error);
      res.status(500).send("Internal Server Error");
    });
});

app.get("/cart", (req, res) => {
  console.log(req.session.cart);
  res.render("pages/cart", { cart: req.session.cart });
});

app.get("/thanks", (req, res) => {
  res.render("pages/thanks");
});

app.post("/add-to-cart", async (req, res) => {
  console.log(`Session: ${JSON.stringify(req.session)}`);
  try {
    if (!req.session.cart) {
      req.session.cart = new Array();
    }
    const productName = req.body.productName.replaceAll("_", " ");
    req.session.cart.push(productName);
    console.log(GAMES);
    GAMES = GAMES.filter((p) => p.name != productName);
    console.log(GAMES);
    console.log(`Added to cart: ${JSON.stringify(productName, null, 2)})}`);
    console.info("Redirecting to /cart");
    res.redirect("back"); // refresh the current page
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/remove-from-cart", async (req, res) => {
  console.log(`Session: ${JSON.stringify(req.session)}`);
  try {
    if (!req.session.cart) {
      res.status(400).send("No items in cart.");
      return;
    }
    const toRemoveName = req.body.productName.replaceAll("_", " ");
    req.session.cart = req.session.cart.filter(
      (productName) => productName !== toRemoveName,
    );
    console.log(`Removed from cart: ${toRemoveName})}`);
    res.redirect("back");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

let CHECKOUT_BLOCKED = false;
app.post("/checkout", async (req, res) => {
  try {
    if (!req.session.cart) {
      console.log("Cart is empty");
      res.status(400).send("Cart is empty");
      return;
    }
    if (req.session.cart.length === 0) {
      console.log("Cart is empty");
      res.status(400).send("Cart is empty");
      return;
    }
    while (CHECKOUT_BLOCKED) {
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
    CHECKOUT_BLOCKED = true;
    try {
      for (let productName of req.session.cart) {
        const product = await db.query(
          "SELECT * FROM computer_names WHERE name = $1",
          [productName],
        );
        if (!product) {
          console.error(`Product not found: ${productName}`);
          res.status(404).send(`Product not found: ${productName}`);
          break;
        }
        await db.query("DELETE FROM computer_names WHERE name = $1", [
          productName,
        ]);
        const gamesResult = await db.query("SELECT * FROM computer_names");
        GAMES = gamesResult.rows;
      }
    } finally {
      CHECKOUT_BLOCKED = false;
    }

    req.session.cart = new Array();
    res.redirect("/thanks");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
