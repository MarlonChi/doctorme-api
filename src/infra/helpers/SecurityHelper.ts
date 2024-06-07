import bcrypt from "bcrypt";

export function hashPassword(password: string) {
  return bcrypt.hashSync(password, 6);
}

export function comparePassword(password: string, hash: string) {
  return bcrypt.compareSync(password, hash);
}

export function encodeToBase64(data: string) {
  return Buffer.from(data).toString("base64");
}

export function decodeFromBase64(data: string) {
  return Buffer.from(data, "base64").toString("utf-8");
}
