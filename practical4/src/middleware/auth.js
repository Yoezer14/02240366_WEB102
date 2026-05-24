import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  try {
    const token = req.header("Authorization");

    if (!token) {
      return res.status(401).json({
        error: "Access denied",
      });
    }

    const verified = jwt.verify(token, "secretkey");

    req.user = verified;

    next();

  } catch (error) {
    res.status(401).json({
      error: "Invalid token",
    });
  }
};

export default auth;