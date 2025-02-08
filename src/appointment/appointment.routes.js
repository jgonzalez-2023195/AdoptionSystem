import { Router } from "express";
import { addAppointment } from './appointment.controller.js'

const api = Router();

api.post('/appointmentRegister', addAppointment)

export default api;