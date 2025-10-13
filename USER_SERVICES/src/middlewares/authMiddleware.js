import STATUS_CODE from "../constants/statusCode.js";
import { verifyToken } from "../services/jwtService.js";
import User from "../models/User.js";

export default async function authMiddleware(req, res, next) {
  try {
    const authHeader = req.headers.authorization || req.headers["x-access-token"];
    if (!authHeader) return res.status(STATUS_CODE.UNAUTHORIZED).json({ success: false, message: "No token provided" });

    const token = authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : authHeader;

    let payload;
    try {
      payload = verifyToken(token);
    } catch {
      return res.status(STATUS_CODE.UNAUTHORIZED).json({ success: false, message: "Invalid or expired token" });
    }

    const user = await User.findByPk(payload.id);
    if (!user) return res.status(STATUS_CODE.UNAUTHORIZED).json({ success: false, message: "User not found" });

    req.user = user.toJSON();
    delete req.user.password;
    next();
  } catch (err) {
    console.error("Auth Middleware Error:", err);
    res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({ success: false, message: "Server Error" });
  }
}
