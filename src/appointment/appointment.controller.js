import Animal from '../animal/animal.model.js'
import User from '../user/user.model.js'
import Appointment from './appointment.model.js';

export const addAppointment = async (req, res) => {
    try {
        const data = req.body; // Obtener todo el objeto de datos

        const { pet, date } = data; // Extraer pet y date para las validaciones

        // Validar que no haya otra cita en la misma fecha
        const existingAppointment = await Appointment.findOne({ date });
        if (existingAppointment) {
            return res.status(400).json({ message: "Ya existe una cita en esa fecha" });
        }

        // Validar que el animal no tenga otra cita ese día
        const animalAppointment = await Appointment.findOne({  pet });
        if (animalAppointment) {
            return res.status(400).json({ message: "Este animal ya tiene una cita " });
        }

        // Crear la nueva cita con todos los datos
        const newAppointment = new Appointment(data);

        // Guardar la nueva cita
        await newAppointment.save();

        // Responder con éxito
        return res.status(201).json({ message: "Cita creada exitosamente", appointment: newAppointment });
    } catch (e) {
        console.error('General error', e);
        return res.status(500).send({
            success: false,
            message: 'General error',
            e
        });
    }
}