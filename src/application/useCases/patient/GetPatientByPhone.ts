import DatabaseService from "@/infra/DatabaseService";

export default class GetPatientByPhoneUseCase {
  constructor(readonly database: DatabaseService) {}

  async execute(phone: string) {
    const INCLUDE_APPOINTMENT = true;
    const INCLUDE_DOCTOR = true;
    const patient = await this.database.getPatientByPhone(
      phone,
      INCLUDE_APPOINTMENT,
      INCLUDE_DOCTOR
    );

    if (!patient) {
      throw new Error("No patient found.");
    }

    return patient;
  }
}
