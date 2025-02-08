import { Schema, model } from "mongoose"

const userSchema = Schema(
    {
        title: {
            type: String,
            required: [true, 'Title is required'],
            minLength: [10, 'Type must be at least 10 characters'],
            maxLength: [50, `Can't be overcome 50 characters`]
        },
        description: {
            type: String,
            required: [true, 'Description is required'],
        },
        adopter: { 
            type: Schema.Types.ObjectId, 
            ref: 'CLIENT', 
            required: [true, 'Adopter is required']
        }, // Usuario que solicita la cita
        pet: { 
            type: Schema.Types.ObjectId, 
            ref: 'Animal', 
            required: [true, 'Pet is required'] 
        }, // Mascota a adoptar
        date: { 
            type: Date, 
            required: true 
        }, // Fecha y hora de la cita
        status: { 
            type: String, 
            enum: ['pending', 'confirmed', 'cancelled', 'completed'], 
            default: 'pending' 
        }
    }
)

export default model('Appointment', userSchema)