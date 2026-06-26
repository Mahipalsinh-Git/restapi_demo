import Joi from "joi";

class BaseDTO {
  static schema = Joi.object({});

  static validate(data) {
    const { error, value } = this.schema.validate(data, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      const errors = error.details.flatMap((d) => d.message);
      return { errors, value: null };
    }

    return { error: null, value };
  }
}

export default BaseDTO;
