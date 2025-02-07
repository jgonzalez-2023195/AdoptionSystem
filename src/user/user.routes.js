import { Router } from "express"
import { 
    getAll, 
    get, 
    update
} from "./user.controller.js"
import { validateJwt } from "../../middlewares/validate.jwt.js"
import { updateUserValidator } from "../../middlewares/validators.js"

const api = Router()

//Rutas privadas (Solo puede acceder si está logeado)
api.get('/', getAll)
api.get('/:id', get)
api.put('/:id', [validateJwt, updateUserValidator], update)

export default api