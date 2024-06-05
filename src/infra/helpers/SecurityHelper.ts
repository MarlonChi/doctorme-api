import bcrypt from "bcrypt";

export function hashPassword(password: string) {
  return bcrypt.hashSync(password, 6);
}

export function comparePassword(password: string, hash: string) {
  return bcrypt.compareSync(password, hash);
}