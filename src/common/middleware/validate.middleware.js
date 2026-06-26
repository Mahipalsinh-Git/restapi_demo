import ApiError from "../utils/api-error.js";

// const validate = (Dtoclass) => {
//   return (req, res, next) => {
//     Dtoclass.validate(req.body);
//   };
// };

class ValidateMiddleware {
  static validate(dtoClass) {
    return (req, res, next) => {
      const { error, value } = dtoClass.validate(req.body);

      if (error) {
        throw ApiError.badRequest(error);
      }

      req.body = value;

      next();
    };
  }
}

export default ValidateMiddleware;
