import { Schema, model } from 'mongoose'

const userSchema = Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required'],
            maxLength: [25, `Can't be overcome 25 characters`]
        },
        description: {
            type: String,
            required: [true, 'Description is required'],
            maxLength: [150, `Can't be overcome 150 characters`]
        },
        age: {
            type: Number,
            required: [true, 'Age is required'],
            min: [1, 'Age must be at least 1'],
            max: [50, 'Age must be less than or equal to 50']
        },
        type: {
            type: String,
            required: [true, 'Type is required'],
            lowercase: true,            
            minLength: [3, 'Type must be at least 3 characters'],
            maxLength: [20, 'Type must not exceed 20 characters']
        },
        keeper: {
            type: Schema.Types.ObjectId,
            ref: 'CLIENT',
            required: [true, 'Keeper is required']  
        }
    }
)

export default model('Animal', userSchema)