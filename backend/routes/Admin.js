const express = require("express");
const router = express.Router();
const db = require("../database/db");

router.post("/adminlogin", (req, res) => {
  const email = req.body.adminEmail;
  const password = req.body.adminPassword;
  if (email.trim() == "" || password.trim() == "") {
    res.json({
      message: "Provide proper email and passwords",
    });
  } else {
    db.query(
      "SELECT * FROM admin_table where admin_email = ?",
      [email],
      (error, result) => {
        if (error) {
          console.log(error);
        }
        if (result.length > 0) {
          if (result[0].admin_password == password) {
            res.json({
              adminLoggedIn: true,
              adminEmail: email,
            });
          } else {
            res.json({
              message: "Username or password do not match",
            });
          }
        } else {
          res.json({
            message: "User do not exist",
          });
        }
      }
    );
  }
});

router.get("/allusers", (req, res) => {
  db.query("SELECT * FROM user_table", (error, result) => {
    if (error) {
      console.log(error);
    }
    res.send(result);
  });
});

router.put("/alluserscust/:id", (req, res) => {
  const id = req.params.id;

  db.query(
    "UPDATE user_table SET user_type = 'Customer' WHERE id = ? ",
    [id],
    (error, result) => {
      if (error) {
        console.log(error);
      }
      res.send(result);
    }
  );
});
router.put("/allusersstaf/:id", (req, res) => {
  const id = req.params.id;

  db.query(
    "UPDATE user_table SET user_type = 'Staff' WHERE id = ? ",
    [id],
    (error, result) => {
      if (error) {
        console.log(error);
      }
      res.send(result);
    }
  );
});
module.exports = router;
