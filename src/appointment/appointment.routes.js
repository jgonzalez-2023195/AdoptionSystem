import { Router } from "express";
import { 
    addAppointment, 
    gettAllApointment, 
    updateAppointment, 
    deleteAppointment 
} from './appointment.controller.js'
import { validateJwt } from "../../middlewares/validate.jwt.js"

const api = Router();

api.post('/appointmentRegister', [validateJwt], addAppointment)
api.get('/appointmentList', [validateJwt], gettAllApointment)
api.put('/appointmentUpdate/:id', [validateJwt], updateAppointment)
api.delete('/appointmentDelete/:id', [validateJwt], deleteAppointment)

export default api;