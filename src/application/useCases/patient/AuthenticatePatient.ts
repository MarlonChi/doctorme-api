import DatabaseService from "@/infra/DatabaseService";
import { BussinesError, NotFoundError } from "@/infra/helpers/Errors";
import {
  comparePassword,
  encodeToBase64,
} from "@/infra/helpers/SecurityHelper";

export default class AuthenticatePatientUseCase {
  constructor(readonly database: DatabaseService) {}

  async execute(phone: string, password: string) {
    const user = await this.database.getUserByPhone(phone);

    if (!user) {
      throw new NotFoundError("User not found.");
    }

    const isPasswordValid = comparePassword(password, user.password);

    if (!isPasswordValid) {
      throw new BussinesError("Phone or password is invalid.");
    }

    const payload = {
      user: {
        id: user.id,
        phone: user.phone,
      },
    };

    // converte o payload para base64
    return {
      token: encodeToBase64(JSON.stringify(payload)),
    };
  }
}
