import db from "./../models/index";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const userController = {};

let signUser = user => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      { user: user },
      process.env.SECRET_KEY,
      { expiresIn: "1yr" },
      (err, token) => {
        if (err) {
          reject(err);
        } else {
          resolve(token);
        }
      }
    );
  });
};

userController.registerUser = (req, res) => {
  const {
    email,
    password,
    photo,
    phone,
    address,
    dob,
    security_answer_1,
    security_answer_2,
    security_answer_3
  } = req.body;

  db.User.findOne({ email }).then(u => {
    if (u !== null) {
      // This user already exists
      res.status(409).json({
        status: false,
        message: "User already exists"
      });
    } else {
      bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(password, salt, function(err, hash) {
          if (err) {
            res.status(500).json({
              status: false,
              message: "There was an error setting up your password"
            });
          } else {
            const user = new db.User({
              email,
              password: hash,
              photo,
              phone,
              address,
              dob,
              security_answer_1,
              security_answer_2,
              security_answer_3
            });
            user
              .save()
              .then(User => {
                signUser(User._id)
                  .then(token => {
                    const tokenise = new db.Token({
                      _userId: User._id,
                      token
                    });
                    tokenise.save(err => {
                      if (err) {
                        return res.status(500).send({ msg: err.message });
                      }

                      res.status(200).json({
                        status: true,
                        token: tokenise.token,
                        data: User.email
                      });
                    });
                  })
                  .catch(err => {
                    res.status(500).json({
                      status: false,
                      message: err.message + "error"
                    });
                  });
              })
              .catch(err => {
                res.status(500).json({ status: false, message: err.message });
              });
          }
        });
      });
    }
  });
};

userController.loginUser = (req, res) => {
  const { email, password } = req.body;
  // console.log(req.protocol);
  db.User.findOne({ email: email }).then(user => {
    if (user !== null) {
      // The user has registered
      // Check user password against the hashed
      bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(password, salt, function(err, hash) {
          bcrypt.compare(password, user.password, function(err, response) {
            if (response === true) {
              signUser(user._id)
                .then(token => {
                  res.status(200).json({
                    status: true,
                    message: "User logged in succesfully",
                    data: user,
                    token
                  });
                })
                .catch(err => {
                  res.status(500).json({ status: false, message: err.message });
                });
            } else {
              res
                .status(400)
                .json({ status: false, message: "Wrong login details" });
            }
          });
        });
      });
    } else {
      res
        .status(404)
        .json({ status: false, message: "This user does not exist" });
    }
  });
};

userController.getAllUsers = (req, res) => {
  db.User.find()
    .then(users => {
      if (!users) {
        res.status(404).json({
          status: false,
          message: "No user is in the database",
          data: []
        });
      } else {
        res.status(200).json({
          status: true,
          message: "All users have been gotten",
          data: users
        });
      }
    })
    .catch(err =>
      res.status(500).json({ status: false, message: err.mesaage })
    );
};

userController.getUserInfo = (req, res) => {
  // Find User
  db.User.findById(req.user)
    .then(user => {
      if (user) {
        res.status(200).json({ status: true, message: "Found", data: user });
      } else {
        res
          .status(404)
          .json({ status: false, message: "This user was not found" });
      }
    })
    .catch(err =>
      res.status(500).json({ status: false, message: err.message })
    );
};

userController.updatePassword = (req, res) => {
  const { password } = req.body;

  // Find User And Update
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(password, salt, function(err, hash) {
      db.User.findById(req.user)
        .then(user => {
          if (user === undefined) {
            res.status(404).json({ status: false, message: "User not found" });
          }
          user.password = hash;
          user.save().then(saved => {
            res.status(200).json({
              status: true,
              message: "Successfully updated this user's password"
            });
          });
        })
        .catch(err => {
          res.status(500).json({ status: false, mesaage: err.mesaage });
        });
    });
  });
};

userController.updateProfile = (req, res) => {
  const { photo, phone, address } = req.body;
  db.User.findById(req.user).then(user => {
    if (user) {
      user.photo = photo;
      user.phone = phone;
      user.address = address;

      user
        .save()
        .then(saved => {
          res.status(200).json({
            status: true,
            message: "Successfully updated this user's profile",
            data: saved
          });
        })
        .catch(err => {
          res.status(500).json({ status: false, message: err.message });
        });
    } else {
      res
        .status(404)
        .json({ status: false, message: "This user was not found" });
    }
  });
};

export default userController;
