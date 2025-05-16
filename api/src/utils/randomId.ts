import crypto from "crypto";

export const randomId = () => crypto.randomBytes(128).toString("base64");
