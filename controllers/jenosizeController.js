const config = require("../config/index");
const axios = require("axios");
const { validationResult } = require("express-validator");

exports.searchNearbyRestaurants = async (req, res, next) => {
  try {
    const { keyword, location, radius } = req.body;

    //validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors);
      const error = new Error("ข้อมูลที่รับมาไม่ถูกต้อง");
      error.statusCode = 422;
      error.validation = errors.array();
      throw error;
    }

    const response = await axios.get(config.GOOGLE_SEARCH_PLACE_API_BASE_URL, {
      params: {
        type: "restaurant",
        keyword: keyword,
        location: location,
        radius: radius,
        key: config.GOOGLE_SEARCH_PLACE_API_KEY,
      },
    });

    if (response.data.status == "OK") {
      res.status(200).json({
        data: response.data,
      });
    } else {
      throw new Error("Google API return error " + response.data.status);
    }
  } catch (error) {
    next(error);
  }
};

exports.game24 = async (req, res, next) => {
  try {
    const { numbers } = req.body;

    //validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors);
      const error = new Error("ข้อมูลที่รับมาไม่ถูกต้อง");
      error.statusCode = 422;
      error.validation = errors.array();
      throw error;
    }
    const response = solve24(numbers);
    if (response.length !== 0) {
      res.status(200).json({
        data: response,
        message: "YES"
      });
    } else {
      throw new Error("NO");
    }
  } catch (error) {
    next(error);
  }
};

var ar = [],
  order = [0, 1, 2],
  op = [],
  val = [];
var NOVAL = 9999,
  oper = "+-*/",
  out;

function rnd(n) {
  return Math.floor(Math.random() * n);
}

function say(s, resultArr) {
  resultArr.push(s);
}

function getvalue(x, dir) {
  var r = NOVAL;
  if (dir > 0) ++x;
  while (1) {
    if (val[x] != NOVAL) {
      r = val[x];
      val[x] = NOVAL;
      break;
    }
    x += dir;
  }
  return r * 1;
}

function calc() {
  var c = 0,
    l,
    r,
    x;
  val = ar.join("/").split("/");
  while (c < 3) {
    x = order[c];
    l = getvalue(x, -1);
    r = getvalue(x, 1);
    switch (op[x]) {
      case 0:
        val[x] = l + r;
        break;
      case 1:
        val[x] = l - r;
        break;
      case 2:
        val[x] = l * r;
        break;
      case 3:
        if (!r || l % r) return 0;
        val[x] = l / r;
    }
    ++c;
  }
  return getvalue(-1, 1);
}

function shuffle(s, n) {
  var x = n,
    p = eval(s),
    r,
    t;
  while (x--) {
    r = rnd(n);
    t = p[x];
    p[x] = p[r];
    p[r] = t;
  }
}

function parenth(n) {
  while (n > 0) --n, (out += "(");
  while (n < 0) ++n, (out += ")");
}

function getpriority(x) {
  for (var z = 3; z--; ) if (order[z] == x) return 3 - z;
  return 0;
}

function showsolution(resultArr) {
  var x = 0,
    p = 0,
    lp = 0,
    v = 0;
  while (x < 4) {
    if (x < 3) {
      lp = p;
      p = getpriority(x);
      v = p - lp;
      if (v > 0) parenth(v);
    }
    out += ar[x];
    if (x < 3) {
      if (v < 0) parenth(v);
      out += oper.charAt(op[x]);
    }
    ++x;
  }
  parenth(-p);
  say(out, resultArr);
}

function solve24(s) {
  let resultArr = [];
  var z = 4,
    r;
  while (z--) ar[z] = s.charCodeAt(z) - 48;
  out = "";
  for (z = 100000; z--; ) {
    r = rnd(256);
    op[0] = r & 3;
    op[1] = (r >> 2) & 3;
    op[2] = (r >> 4) & 3;
    shuffle("ar", 4);
    shuffle("order", 3);
    if (calc() != 24) continue;
    showsolution(resultArr);
    break;
  }
  return resultArr;
}