import crypto from "crypto";

export const auth = (salt: string, password: string) =>
  crypto
    .createHmac("sha256", [salt, password].join("/"))
    .update(process.env.KEY)
    .digest("hex");
