import ApiResponse from "../../common/utils/api-response.js";
import { registerService } from "./auth.service.js";

const registerController = async (req, res) => {
  const user = registerService(req.body);

  ApiResponse.create(res, "Registration success", user);
};

export { registerController };
