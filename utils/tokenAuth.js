import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token;
  if (!authHeader) {
    return res.status(403).send("you dit not provide a token");
  }
  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.TOKEN_KEY, (err, user) => {
    if (err) {
      return res.status(403).send("you provided an invalid token");
    }
    req.user = user;
    next();
  });
};

export default verifyToken;
