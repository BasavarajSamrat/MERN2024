

const jwt = require("jsonwebtoken");
const User = require("../models/user-model");

const authMiddleware = async (req, res, next) => {
  const token = req.header("Authorization");
  console.log(token)

  if (!token) {
    return res.status(401).json({ message: "Unauthorized. Token not provided." });
  }

  const jwtToken = token.startsWith("Bearer ")
    ? token.slice(7).trim()
    : null;

  if (!jwtToken) {
    return res.status(401).json({ message: "Invalid token format. Expected 'Bearer <token>'." });
  }

  try {
    const isVerified = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY);

    // Find user by the decoded token payload (email in this case)
    const userData = await User.findOne({ email: isVerified.email }).select("-password");

    if (!userData) {
      return res.status(404).json({ message: "User not found. Authorization failed." });
    }

    // Attach user data to the request object
    req.token = jwtToken;
    req.user = userData;
    req.userID = userData._id;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    console.error("JWT Verification Error:", error.message);
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token has expired. Please log in again." });
    }
    return res.status(401).json({ message: "Unauthorized. Invalid token." });
  }
};

module.exports = authMiddleware;
