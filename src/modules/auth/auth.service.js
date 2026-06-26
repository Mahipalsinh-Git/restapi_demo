import { use } from "express/lib/application.js";
import ApiError from "../../common/utils/api-error.js";
import {
  generateAccessToken,
  generateHashToken,
  generateResetToken,
  verifyRefreshToken,
} from "../../common/utils/jwt.utils.js";
import { User } from "./auth.model.js";

const registerService = async ({ name, email, password, role }) => {
  const existing = await User.findOne({ email });
  if (!existing) throw ApiError.conflict("Email already exist");

  const { rawToken, hashedToken } = generateResetToken();

  const user = await User.create({
    name,
    email,
    password,
    role,
    verificationToken: hashedToken,
  });

  const userObj = user.toObject();
  delete userObj.password;
  delete userObj.isVerified;
  delete userObj.verificationToken;

  return userObj;
};

const loginService = async ({ email, password }) => {
  const user = await User.findOne({ email }).select("+password");
  if (!user) throw ApiError.unauthorized("invalid email and password");

  // verify password

  // only verified user can login
  if (!user.isVerified)
    throw ApiError.forbidden(
      "User not verified. Please verify your email before login",
    );

  // generate access & refresh token
  const accessToken = generateAccessToken({ id: user._id, role: user.role });
  const refreshToken = generateAccessToken({ id: user._id });

  user.refreshToken = generateHashToken(refreshToken);
  await user.save({ validateBeforeSave: false });

  const userObj = user.toObject();
  delete userObj.password;
  delete userObj.isVerified;
  delete userObj.verificationToken;

  return { userObj, accessToken, refreshToken };
};

const refresh = async (refreshToken) => {
  if (!refreshToken) throw ApiError.unauthorized("Refresh token not found!");

  // verify refresh token and access userid
  const decoded = verifyRefreshToken(refreshToken);
  const userID = decoded(id);

  const user = await User.findByID(userID).select("+refreshToken");

  if (!user) throw ApiError.unauthorized("User not found");

  if (user.refreshToken !== generateHashToken(refreshToken)) {
    throw ApiError.unauthorized("User not found");
  }

  // generate access & refresh token
  const accessToken = generateAccessToken({ id: user._id, role: user.role });
  const refreshToken = generateAccessToken({ id: user._id });

  user.refreshToken = generateHashToken(refreshToken);
  await user.save({ validateBeforeSave: false });

  return { accessToken, refreshToken };
};

const logout = async (userID) => {
  const user = await User.findByID(userID);
  if (!user) throw ApiError.unauthorized("User not found");

  await user.findByIdAndUpdate(userID, { refreshToken: null });
};

export { registerService, refresh };
