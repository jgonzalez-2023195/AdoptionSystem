import { Router } from "express";
import { addAnimal, deleteAnimal, getAllAnimal, updateAnimal } from './animal.controller.js'

const api = Router();

// Definir la ruta para registrar una mascota
api.post('/petRegister', addAnimal)
api.get('/petList', getAllAnimal)
api.put('/petUpdate/:id', updateAnimal)
api.delete('/petDelete/:id', deleteAnimal)

export default api;
