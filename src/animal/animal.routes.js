import { Router } from "express";
import { 
    addAnimal, 
    deleteAnimal, 
    getAllAnimal, 
    updateAnimal 
} from './animal.controller.js'
import { validateJwt } from "../../middlewares/validate.jwt.js"

const api = Router();

// Definir la ruta para registrar una mascota
api.post('/petRegister', [validateJwt], addAnimal)
api.get('/petList', [validateJwt], getAllAnimal)
api.put('/petUpdate/:id', [validateJwt], updateAnimal)
api.delete('/petDelete/:id', [validateJwt], deleteAnimal)

export default api;
