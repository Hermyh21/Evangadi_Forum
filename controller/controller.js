const express = require("express");
const dbConn = require("../db/dbConfig");
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

async function register(req, res) {
  const { username, firstname, lastname, email, password } = req.body;
  if (!username || !email || !password || !firstname || !lastname) {
    return res.send
      .status(400)
      .json({ msg: "please provide all required info" });
  }
  try {
    const [user] = await dbConn.query(
      "select username, userid from users where username=?or email=?",
      [username, email]
    );
    if (user.length > 0) {
      res.status(400).json({ msg: "user already registered" });
    }
    if (password.length < 8) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "password must atleast be 8 characters" });
    }
    // password encryption
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // .get((req, res) => {
    //   res.send("register user");
    // })
    // await dbConn.query(
    //   "INSERT INTO users(username,hashedPassword, firstname, lastname, email) values (?,?,?,?,?)",
    //   [username, firstname, lastname, email, hashedPassword]
    // );
    const sql =
      "INSERT INTO users(username, hashedPassword, firstname, lastname, email) VALUES (?, ?, ?, ?, ?)";
    const values = [username, hashedPassword, firstname, lastname, email];

    console.log("Executing SQL:", sql);
    console.log("Values:", values);

    await dbConn.query(sql, values);

    return res.status(StatusCodes.CREATED).json({ msg: "user registered" });
  } catch (error) {
    console.error("Error during registration:", error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "something went wrong, try again later" });
  }
}
async function checkUser(req, res) {
  const { username, firstname, lastname, email, password } = req.body;
  if (!email || !password || !firstname || !lastname || !username) {
    return res.status(400).json({ msg: "please provide all required info" });
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    await dbConn.query(
      "INSERT INTO users(username, hashedPassword, firstname, lastname, email) values (?,?,?,?,?)",
      [username, hashedPassword, firstname, lastname, email]
    );

    return res.status(StatusCodes.CREATED).json({ msg: "user registered" });
  } catch (error) {
    console.log(error.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "something went wrong, try again later" });
  }
}

async function login(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ msg: "please fill in all the fields" });
  }
  try {
    const [user] = await dbConn.query(
      "select username, userid, hashedPassword from users where email=?",
      [email]
    );
    console.log("User:", user);
    if (user.length == 0) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "Invalid credential" });
    }
    const isMatch = await bcrypt.compare(password, user[0].hashedPassword);
    if (!isMatch) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "Invalid email or password" });
    }
    const username = user[0].username;
    const userid = user[0].userid;
    // const token = jwt.sign({ username, userid }, "secret", { expiresIn: "Id" });
    const token = jwt.sign({ username, userid }, process.env.JWT_SECRET, {
      expiresIn: 86400,
    }); // 86400 seconds in a day
    // console.log("Generated Token:", token);
    return res.json({ user: user[0], token });
    // return res.json({ user: user[0].password });
  } catch (error) {
    console.log(error.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "something went wrong, try agin later" });
  }
}
module.exports = { register, login, checkUser };
