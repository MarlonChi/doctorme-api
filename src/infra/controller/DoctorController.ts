import { Request, Response } from "express";
import DoctorController from "@/application/controller/DoctorController";
import ListDoctorUseCase from "@/application/useCases/doctor/ListDoctor";
import { database } from "../DatabaseService";

export default class DoctorControllerImpl implements DoctorController {
  async listDoctor(req: Request, res: Response) {
    const useCase = new ListDoctorUseCase(database);
    const doctors = await useCase.execute();

    res.status(200).json(doctors);
  }
}
