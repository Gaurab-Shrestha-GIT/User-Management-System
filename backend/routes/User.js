const express = require("express");
const router = express.Router();
const db = require("../database/db");

router.post("/register", (req, res) => {
  const name = req.body.name;
  const phoneNumber = req.body.phoneNumber;
  const email = req.body.email;
  const password = req.body.password;
  const passwordConfirm = req.body.passwordConfirm;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s]{2,8}$/i;
  const numberRegex =
    /^\+?(?:977)?[ -]?(?:(?:(?:98|97)-?\d{8})|(?:01-?\d{7}))$/i;

  const id = email + Date.now();
  const userType = "Customer";

  if (name.trim() == "") {
    res.json({
      nameMessage: "Name field is required",
    });
  } else if (phoneNumber.trim() == "") {
    res.json({
      numberMessage: "Number field is required",
    });
  } else if (!numberRegex.test(phoneNumber)) {
    res.json({ numberMessage: "Invalid Number" });
  } else if (email.trim() == "") {
    res.json({
      emailMessage: "Email field is required",
    });
  } else if (!emailRegex.test(email)) {
    res.json({
      emailMessage: "Invalid Email",
    });
  } else if (password.trim() == "") {
    res.json({
      passwordMessage: "Password field is required",
    });
  } else if (passwordConfirm.trim() == "") {
    res.json({
      cPasswordMessage: "Password field is required",
    });
  } else if (password != passwordConfirm) {
    res.json({
      cPasswordMessage: "Password not matched",
    });
  } else {
    db.query(
      "SELECT * from user_table where user_email = ?",
      [email],
      (error, result) => {
        if (result.length > 0) {
          res.json({
            registerMessage: "Email is already registered",
          });
        } else {
          db.query(
            "INSERT INTO user_table (id, user_email, user_password,user_name, user_number, user_type) VALUES (?, ?, ?, ?, ?, ?)",
            [id, email, password, name, phoneNumber, userType],
            (error, result) => {
              if (error) {
                console.log(error);
              }
              if (result) {
                res.json({
                  registerMessage: "User Successfully Registered",
                });
              }
            }
          );
        }
      }
    );
  }
});

router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const dropdownValue = req.body.dropdown;

  if (email.trim() == "" || password.trim() == "") {
    res.json({
      message: "Provide proper email and passwords",
    });
  } else {
    db.query(
      "SELECT * FROM user_table where user_email = ?",
      [email],
      (error, result) => {
        if (error) {
          console.log(error);
        }
        if (result.length > 0) {
          if (result[0].user_password == password) {
            if (dropdownValue == "Customer") {
              if (dropdownValue == result[0].user_type) {
                res.json({
                  customerLoggedIn: true,
                  customerEmail: email,
                });
              } else {
                res.json({
                  message: "User do not exist",
                });
              }
            } else if (dropdownValue == "Staff") {
              if (dropdownValue == result[0].user_type) {
                res.json({
                  staffLoggedIn: true,
                  staffEmail: email,
                });
              } else {
                res.json({
                  message: "User do not exist",
                });
              }
            } else {
              res.json({
                message: "User do not exist",
              });
            }
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

router.post("/customerprofile", (req, res) => {
  const email = req.body.customerEmail;

  db.query(
    "SELECT * FROM user_table WHERE user_email = ?",
    [email],
    (error, result) => {
      if (error) {
        console.log(error);
      }
      res.send(result);
    }
  );
});
router.post("/staffprofile", (req, res) => {
  const email = req.body.staffEmail;

  db.query(
    "SELECT * FROM user_table WHERE user_email = ?",
    [email],
    (error, result) => {
      if (error) {
        console.log(error);
      }
      res.send(result);
    }
  );
});

router.post("/updatestaffprofile", (req, res) => {
  const staffId = req.body.staffId;

  db.query(
    "SELECT * FROM user_table WHERE id = ?",
    [staffId],
    (error, result) => {
      if (error) {
        console.log(error);
      }
      res.send(result);
    }
  );
});

router.put("/updatestaffprofile/:id", (req, res) => {
  const id = req.params.id;
  const name = req.body.staffName;
  const number = req.body.staffPhoneNumber;
  const password = req.body.staffPassword;
  const numberRegex =
    /^\+?(?:977)?[ -]?(?:(?:(?:98|97)-?\d{8})|(?:01-?\d{7}))$/i;

  if (name.trim() == "") {
    res.json({
      nameMessage: "Name field is required",
    });
  } else if (number.trim() == "") {
    res.json({
      numberMessage: "Number field is required",
    });
  } else if (!numberRegex.test(number)) {
    res.json({
      numberMessage: "Invalid Number",
    });
  } else if (password.trim() == "") {
    res.json({
      passwordMessage: "Password field is required",
    });
  } else {
    db.query(
      "UPDATE user_table SET user_name = ?, user_number = ?, user_password = ? WHERE id = ? ",
      [name, number, password, id],
      (error, result) => {
        if (error) {
          console.log(error);
        } else {
          res.json({
            updated: true,
          });
        }
      }
    );
  }
});

router.post("/updatecustomerprofile", (req, res) => {
  const id = req.body.customerId;

  db.query("SELECT * FROM user_table WHERE id = ? ", [id], (error, result) => {
    if (error) {
      console.log(error);
    }
    res.send(result);
  });
});

router.put("/updatecustomerprofile/:id", (req, res) => {
  const id = req.body.id;

  const custname = req.body.name;
  const custnumber = req.body.number;
  const custpassword = req.body.password;
  const numberRegex =
    /^\+?(?:977)?[ -]?(?:(?:(?:98|97)-?\d{8})|(?:01-?\d{7}))$/i;

  if (custname.trim() == "") {
    res.json({
      nameMessage: "Name field is required",
    });
  } else if (custnumber.trim() == "") {
    res.json({
      numberMessage: "Number field is required",
    });
  } else if (!numberRegex.test(custnumber)) {
    res.json({
      numberMessage: "Invalid Number",
    });
  } else if (custpassword.trim() == "") {
    res.json({
      passwordMessage: "Password field is required",
    });
  } else {
    db.query(
      "UPDATE user_table SET user_name = ?, user_number = ?, user_password = ? WHERE id = ? ",
      [custname, custnumber, custpassword, id],
      (error, result) => {
        if (error) {
          console.log(error);
        } else {
          res.json({
            updated: true,
            result: result,
          });
        }
      }
    );
  }
});

module.exports = router;
