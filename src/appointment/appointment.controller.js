import Appointment from './appointment.model.js';

export const addAppointment = async (req, res) => {
    try {
        const data = req.body
        const { pet, date } = data


        const appointmentDate = new Date(date)
        const currentDate = new Date()
        if (appointmentDate < currentDate) return res.status(400).send({ message: "No se puede programar una cita en una fecha pasada." });
        

        const existingAppointment = await Appointment.findOne({ date, pet })
        if (existingAppointment) return res.status(404).send({ message: "This animal already has an appointment scheduled or there is already an appointment on that date." })

        const newAppointment = new Appointment(data);
        await newAppointment.save();

        return res.status(200).send({ message: "Cita creada exitosamente", newAppointment });
    } catch (e) {
        console.error('General error', e);
        return res.status(500).send(
            {
                success: false,
                message: 'General error',
                e
            }
        )
    }
}

export const gettAllApointment = async(req, res)=> {
    try {
        let appointment = await Appointment.find()
        if(appointment.length === 0) return res.status(404).send({message: 'No registered appointment'})
            return res.status(200).send({message: 'Appointment found: ', appointment})
    } catch (e) {
        console.error('General error', e);
        return res.status(500).send(
            {
                success: false,
                message: 'General error',
                e
            }
        )
    }
}

export const updateAppointment = async (req, res)=> {
    try {
        let id = req.params.id
        let data = req.body
        let updateAppointment = await Appointment.findByIdAndUpdate(id, data, {new: true})
        if(!updateAppointment) return res.status(400).send({message: 'Appointment not found, Appointment not update'})
            return res.status(200).send({message: 'Appointment updated succesfully', updateAppointment})
    } catch (e) {
        console.error('General error', e);
        return res.status(500).send(
            {
                success: false,
                message: 'General error',
                e
            }
        )
    }
}

export const deleteAppointment = async (req, res)=> {
    try {
        let id = req.params.id
        let deleteAppointment = await Appointment.findByIdAndDelete(id)
        if(!deleteAppointment) return res.status(404).send({message: 'Appointment not found, Appointment not delete'})
            return res.status(200).send({message: 'Deleted Appointment for sistem', deleteAppointment})
    } catch (e) {
        console.error('General error', e);
        return res.status(500).send(
            {
                success: false,
                message: 'General error',
                e
            }
        )
    }
}