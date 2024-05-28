const express = require("express");
const router = express.Router();
const User = require("../models/userAuthModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register

router.post("/register", async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 8);

  const userData = new User({
    email: req.body.email,
    password: hashedPassword,
    role: req.body.role,
  });

  try {
    const user = await userData.save();
    res.status(201).json({ message: "User registered successfuly!", user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Login
// router.post("/login", async (req, res) => {
//   const user = await User.findOne({ email: req.body.email });

//   if (!user) {
//     return res.status(404).json({ message: "Authentication failed" });
//   }

//   const passwordMatched = await bcrypt.compare(
//     req.body.password,
//     user.password
//   );

//   if (!passwordMatched) {
//     return res.status(404).json({ message: "Authentication failed" });
//   }

//   var token = jwt.sign(
//     { id: user._id, admin: false, email: user.email },
//     process.env.SECRET_KEY
//   );

//   return res.status(200).json({ message: "User logged in!", token });
// });

const BlacklistedToken = require("../models/blacklistedToken");

router.post("/login", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return res.status(404).json({ message: "Authentication failed" });
  }

  const passwordMatched = await bcrypt.compare(
    req.body.password,
    user.password
  );

  if (!passwordMatched) {
    return res.status(404).json({ message: "Authentication failed" });
  }


  // const tokenExists = await BlacklistedToken.findOne({ token: req.headers.authorization.split(" ")[1] });

  // if (tokenExists) {
  //   return res.status(403).json({ message: "Token is blacklisted. Please login again." });
  // }

  // var token = jwt.sign(
  //   { id: user._id, admin: false, email: user.email },
  //   process.env.SECRET_KEY
  // );

  return res.status(200).json({ message: "User logged in!", user });
});
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const user = await User.findById(id);

  if (!user) {
    return res.status(404).json({ message: "user not Found" });
  }

  return res.status(200).json({ message: "user Find successfully!", user });
});


router.put('/:id', async (req, res) => {
  const id = req.params.id;
  const update = req.body; // Assuming req.body contains the fields to be updated

  try {
    const updatedUser = await User.findByIdAndUpdate(id, update, {
      new: true, // Return the updated document
    });

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json({ message: 'User updated successfully!', user: updatedUser });
  } catch (error) {
    console.error('Error updating user:', error);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
});
router.post("/logout", async (req, res) => {
  const token = req.headers.authorization.split(" ")[1]; // Assuming the token is sent in the Authorization header

  try {
    // Check if the token exists in the blacklist
    const tokenExists = await BlacklistedToken.findOne({ token });

    if (tokenExists) {
      // Token is already blacklisted, so it's as good as logged out
      return res.status(200).json({ message: "User already logged out" });
    } else {
      // Add the token to the blacklist
      const blacklistedToken = new BlacklistedToken({
        token,
      });
      await blacklistedToken.save();
      return res.status(200).json({ message: "User logged out successfully" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
});



module.exports = router;

