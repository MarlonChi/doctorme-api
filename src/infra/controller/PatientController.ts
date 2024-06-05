import { Request, Response } from "express";
import PatientController from "@/application/controller/PatientController";
import CreatePatientUseCase from "@/application/useCases/patient/CreatePatient";
import { database } from "../DatabaseService";

export default class PatientControllerImpl implements PatientController {
  async createPatient(req: Request, res: Response) {
    const { name, phone, password } = req.body;
    const useCase = new CreatePatientUseCase(database);
    const patient = await useCase.execute(name, phone, password);

    res.status(201).json(patient);
  }

  async createAppointment(req: Request, res: Response) {
    res.status(201).json("");
  }
}
