import DatabaseService from "@/infra/DatabaseService";
import { BussinesError, NotFoundError } from "@/infra/helpers/Errors";

export default class CreateAppointmentUseCase {
  constructor(readonly database: DatabaseService) {}

  async execute(patientId: number, agendaId: number) {
    const patient = await this.database.getPatientById(patientId);

    if (!patient) {
      throw new NotFoundError("Patient not found");
    }

    const agenda = await this.database.getAgendaById(agendaId);

    if (!agenda?.available) {
      throw new BussinesError("Agenda not available for this date.");
    }

    await this.database.updateAgenda(agenda.id, { available: false });

    const appointment = await this.database.createAppointment(
      patient.id,
      agenda.id,
      agenda.date
    );

    return appointment;
  }
}
