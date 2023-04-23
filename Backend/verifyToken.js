import { createError } from "./error.js";
import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return next(createError(401, "You are not authorized!"));

  jwt.verify(token, process.env.JWT_TOKEN, (err, user) => {
    if (err) return next(createError(403, "Invalid Token!"));
    req.user = user;
  });
  next();
};
