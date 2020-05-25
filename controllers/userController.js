const jwt = require("jsonwebtoken");
const config = require("../config/index");
const User = require("../models/user");

exports.index = (req, res, next) => {
  return res.status(200).json({
    data: User,
  });
};

exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    //check ว่ามี username ในระบบหรือไม่
    const user = User.find(
      (u) => u.username === username && u.password === password
    );
    console.log(user);
    if (!user) {
      const error = new Error("ไม่พบผู้ใช้งานในระบบ");
      error.statusCode = 404;
      throw error;
    }

    //สร้าง token
    const token = await jwt.sign(
      {
        id: user.id,
        role: user.role,
      },
      config.JWT_SECRET,
      { expiresIn: "5 days" }
    );
    console.log(token);
    //decode วันหมดอายุ
    const expires_in = jwt.decode(token);

    return res.status(200).json({
      access_token: token,
      expires_in: expires_in.exp,
      token_type: "Bearer",
    });
  } catch (error) {
    next(error);
  }
};

//get profile
exports.me = (req, res, next) => {
  const { id, name, firstName, lastName, role } = req.user;

  return res.status(200).json({
    data: {
      id: id,
      name: name,
      firstName: firstName,
      lastName: lastName,
      role: role,
    },
  });
};
