import crypto from "crypto";

import {} from "jsonwebtoken";

const generateResetToken = () => {
  const rawToken = crypto.randomBytes(32).toString("hex");
  const hasedToken = crypto.createHash("sha256").update(rawToken).digest("hex");

  return { rawToken, hasedToken };
};

export { generateResetToken };
