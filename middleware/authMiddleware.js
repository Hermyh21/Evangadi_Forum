const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");

async function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ msg: "Authentication invalid" });
  }
  const token = authHeader.split(" ")[1];
  console.log(authHeader);
  console.log(token);

  try {
    const data = jwt.verify(token, process.env.JWT_SECRET);
    req.user = data; // Assuming you want to store user data in the request object
    // next();
    return res.status(StatusCodes.OK).json({ data });
  } catch (error) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ msg: "Authentication invalid" });
  }
}

module.exports = authMiddleware;
