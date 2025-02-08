import Animal from './animal.model.js'
import User from '../user/user.model.js'


export const addAnimal = async(req, res)=>{
    try {
        let data = req.body
        const { keeper } = data;  // Obtienes directamente el ID del keeper (usuario) del cuerpo de la solicitud
        // Buscar el usuario (keeper) por su ID
        const user = await User.findById(keeper);
        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'Keeper not exist'
            });
        }
        // Si el keeper existe, creas el nuevo animal
        let animal = new Animal(data); // Usas los datos completos de la solicitud
        animal.keeper = user._id;  // Asignas el ID del keeper encontrado
        await animal.save()
        return res.send({message: 'Pet successfully saved'})
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

export const getAllAnimal = async(req, res)=> {
    try {
        let animal = await Animal.find()
        if(animal.length === 0) return res.status(404).send({message: 'No pets found'})
            return res.status(200).send({message: 'Pets found: ', animal})
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

export const updateAnimal = async (req, res)=> {
    try {
        let id = req.params.id
        let data = req.body
        let updateAnimal = await Animal.findByIdAndUpdate(id, data, {new: true})
        if(!updateAnimal) return res.status(400).send({message: 'Pet not found, pet not update'})
            return res.status(200).send({message: 'Pet updated succesfully', updateAnimal})
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

export const deleteAnimal = async (req, res)=> {
    try {
        let id = req.params.id
        let deleteAnimal = await Animal.findByIdAndDelete(id)
        if(!deleteAnimal) return res.status(404).send({message: 'Pet not found, pet not delete'})
            return res.status(200).send({message: 'Deleted pet for sistem', deleteAnimal})
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