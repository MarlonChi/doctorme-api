import { Request, Response } from "express";

export default interface PatientController {
  createPatient(request: Request, response: Response): Promise<void>;
  createAppointment(request: Request, response: Response): Promise<void>;
  authenticate(request: Request, response: Response): Promise<void>;
  getPatientByPhone(request: Request, response: Response): Promise<void>;
}
