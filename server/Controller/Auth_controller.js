// defining dependencies
require("dotenv").config()
const bcrypt = require('bcrypt');
const { SenseAccounts } = require("../Model/sense_inventory_DB");
const jwt = require("jsonwebtoken");

// functions
async function addUser(req,res) {
  const {name,password} = req.body;

  try {
    const saltRounds = 14;
    const hashedPass = await bcrypt.hash(password, saltRounds);

    await SenseAccounts.create({
      user: name,
      password: hashedPass,
      role: name === "User" ? "User" : "Admin"
    })

    return;
  } catch (err) {
    return res.status(500).json({ msg: err });
  }
}

const validateUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    console.log(username, password);

    const user = await SenseAccounts.findOne({ where: { user: username } });

    if (!user) {
      return res.status(401).json({ msg: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ msg: "Invalid password", validInfo: false});
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "24h" });

    const userType = user.role === "Admin" ? "Admin" : "User";

    res.cookie("loginToken", token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000, secure: false });

    console.log(res.getHeaders());

    return res.status(200).json({ msg: `Authenticated as ${userType}`, validInfo: true, user: userType });
  } catch (err) {
    console.error("Error in validateUser:", err);
    return res.status(500).json({ msg: "Internal server error" });
  }
};

const getCookie =  (req, res) => {
  const token = req.cookies.loginToken;

  if (!token) {
    return res.status(200).json({ loggedIn: false });
  }

  try {
    const valid = jwt.verify(token, process.env.JWT_SECRET);
    if(valid) {
      return res.json({ loggedIn: true });
    } else {
      return res.json({ loggedIn: false });
    }
  } catch (error) {
    return res.json({ loggedIn: false });
  }
};


// exports
module.exports = {
  addUser,
  validateUser,
  getCookie
}