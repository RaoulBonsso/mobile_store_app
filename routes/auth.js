const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const authRouter = express.Router();

authRouter.post("/api/signup", async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    existingEmail = await User.findOne({ email });

    if (existingEmail) {
      return res
        .status(400)
        .json({ message: "User already exists with this email" });
    } else {
        // generate de salt with a cost factor of 10 
        const salt = await bcrypt.genSalt(10) 
        //hash the password using the generates salt
        const hashPassword =  await bcrypt.hash(password, salt),
      var user = new User({ fullName, email, password: hashPassword});
      user = await user.save();
      res.json(user);
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = authRouter;