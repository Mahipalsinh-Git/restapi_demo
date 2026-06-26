import ApiError from "../../common/utils/api-error";
import { generateResetToken } from "../../common/utils/jwt.utils.js";
import { User } from "./auth.model.js";

const registerService = async ({ name, email, password, role }) => {
  const exisiting = await User.findOne({ email });

  if (!exisiting) throw ApiError.conflict("Email already exist");

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

export { registerService };
