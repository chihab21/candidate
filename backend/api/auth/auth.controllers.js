const UserSchema = require("../users/user.models");
const bcrypt = require("bcrypt");
const { sign } = require("jsonwebtoken");
require("dotenv").config();

exports.register = async (req, res) => {
  const data = { ...req.body, role: req.body.role || "CONDIDAT" };

  try {
    // Check if the email already exists
    const existingUser = await UserSchema.findOne({ email: data.email });
    if (existingUser) {
      return res.status(400).json({ error: "This email is already in use." });
    }

    // Hash the password before saving to the database
    const salt = bcrypt.genSaltSync(10);
    const cryptedPass = bcrypt.hashSync(data.password, salt);
    data.password = cryptedPass;

    const newUser = new UserSchema(data);
    await newUser.save();

    res.status(201).json({ message: "User registered successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while registering the user." });
  }
};

exports.login = async (req, res) => {
  const data = req.body;
  const user = await UserSchema.findOne({ email: data.email });
  if (!user) {
    res.status(404).send("email or password invalid !");
  } else {
    const validPass = bcrypt.compareSync(data.password, user.password);
    if (!validPass) {
      res.status(401).send("email or password invalid !");
    } else {
      const { password, ...payload } = user.toObject();

      const token = sign(payload, process.env.Secret_Key, {
        expiresIn: "2d",
      });

      res.status(200).send({ mytoken: token });
    }
  }
};
