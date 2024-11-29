import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  try {
    if (!token)
      return res.status(401).json({ error: "Unauthorized-no token provided" });

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified)
      return res.status(401).json({ error: "Unauthorized-token is not valid" });
    req.userId = verified.userId;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Unauthorized-token is not valid" });
  }
};
