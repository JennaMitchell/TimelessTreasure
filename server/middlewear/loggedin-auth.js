module.exports = (req, res, next) => {
  console.log("logged-in-auth");

  console.log(req.session);
  if (!req.session.isLoggedIn) {
    return res.status(401).json({
      message: `Please Login`,
      error: [{ error: "Please Login" }],
    });
  }
  next();
};
