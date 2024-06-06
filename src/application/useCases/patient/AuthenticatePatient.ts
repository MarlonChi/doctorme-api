import DatabaseService from "@/infra/DatabaseService";

export default class AuthenticatePatientUseCase {
  constructor(readonly database: DatabaseService) {}

  async execute() {}
}
