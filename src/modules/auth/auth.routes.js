import { Router } from "express";

import { registerController } from "./auth.controller.js";
import ValidateMiddleware from "../../common/middleware/validate.middleware.js";
import RegisterDto from "./dto/register.dto.js";

const route = Router();

route.post(
  "/register",
  ValidateMiddleware.validate(RegisterDto),
  registerController,
);

export default route;
