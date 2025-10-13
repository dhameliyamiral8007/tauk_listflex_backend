import User from "../models/users.js";
import STATUS_CODE from "../constants/statusCode.js";
import { hashPassword, comparePassword } from "../service/hashPassword.js";
import { signToken } from "../service/jwtService.js";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password, profile_image } = req.body;
    const existing = await User.findOne({ where: { email } });
    if (existing) return res.status(STATUS_CODE.BAD_REQUEST).json({ success: false, message: "Email exists" });

    const hashed = await hashPassword(password);
    const user = await User.create({ name, email, password: hashed, profile_image });

    return res.status(STATUS_CODE.CREATED).json({ success: true, message: "User registered", data: user });
  } catch (err) {
    console.error(err);
    res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({ success: false, message: "Server Error" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(STATUS_CODE.BAD_REQUEST).json({ success: false, message: "Email & password required" });

    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(STATUS_CODE.NOT_FOUND).json({ success: false, message: "User not found" });

    const isValid = await comparePassword(password, user.password);
    if (!isValid) return res.status(STATUS_CODE.UNAUTHORIZED).json({ success: false, message: "Invalid credentials" });

    const token = signToken({ id: user.id,  });
    const userJson = user.toJSON();
    delete userJson.password;

    res.status(STATUS_CODE.OK).json({ success: true, message: "Login successful", data: { user: userJson, token } });
  } catch (err) {
    console.error(err);
    res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({ success: false, message: "Server Error" });
  }
};

