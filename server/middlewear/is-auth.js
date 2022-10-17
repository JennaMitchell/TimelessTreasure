const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.get("Authorization");

  if (!authHeader) {
    const error = new Error("Not authenticated.");
    error.statusCode = 401;
    throw error;
  }
  const token = authHeader.split(" ")[1];

  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.JSW_PASS);
    if (!decodedToken) {
      return res
        .status(401)
        .json({ error: err, message: "Not authenticated.", status: 401 });
    }
  } catch (err) {
    return res.status(500).json({ error: err, message: "Server Error" });
  }

  req.userId = decodedToken.userId;
  console.log("line 24 is-auth");
  next();
};
