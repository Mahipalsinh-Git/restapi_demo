import Joi from "joi";
import BaseDTO from "../../../common/dto/base.dto.js";

class RegisterDto extends BaseDTO {
  static schema = Joi.object({
    name: Joi.string().trim().min(2).max(50).required(),
    email: Joi.string().email().trim().min(2).max(50).lowercase().required(),
    password: Joi.string()
      .trim()
      .min(2)
      .max(50)
      .required()
      .message("Password joi error message"),
    role: Joi.string().valid("customer", "seller").default("customer"),
  });
}

export default RegisterDto;
