import "express-async-errors";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import DoctorController from "@/application/controller/DoctorController";
import PatientController from "@/application/controller/PatientController";
import { validateBody, validateParams } from "./ValidationMiddleware";
import {
  authenticationSchema,
  createAppointmentAgendaIdSchema,
  createPatientIdSchema,
  getDoctorByIdSchema,
  getPatientByPhoneSchema,
} from "./ValidationSchemas";
export default class Router {
  app: express.Express;

  constructor(
    readonly doctorController: DoctorController,
    readonly patientController: PatientController
  ) {
    this.app = express();
    this.app.use(cors());
    this.app.use(helmet());
    this.app.use(express.json());

    this.setRoutes();
  }

  private setRoutes() {
    this.app.get("/", (req, res) => {
      res.send("Hello World!");
    });

    this.app.post(
      "/authenticate",
      validateBody(authenticationSchema),
      this.patientController.authenticate
    );

    this.app.get("/doctors", this.doctorController.listDoctor);
    this.app.get(
      "/doctor/:id",
      validateParams(getDoctorByIdSchema),
      this.doctorController.getDoctorById
    );
    this.app.post("/patient", this.patientController.createPatient);
    this.app.get(
      "/patient/:phone",
      validateParams(getPatientByPhoneSchema),
      this.patientController.getPatientByPhone
    );

    this.app.post(
      "/patient/:patientId/appointment",
      validateParams(createPatientIdSchema),
      validateBody(createAppointmentAgendaIdSchema),
      this.patientController.createAppointment
    );
  }

  public start(port: number) {
    this.app.listen(port, () => {
      console.log(`🚀 Server running on port ${port}`);
    });
  }
}
