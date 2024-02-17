import { Router } from 'express'
import { testStudent, registerTeacher, login, registerStudent, updateTS, deleteTS } from './student.controller.js'
import { validateJwt } from '../middlewares/validate-jwt.js'

const api = Router()

api.get('/testStudent', testStudent)
api.post('/login', login)
api.post('/registerStudent', registerStudent)
api.post('/registerTeacher',[validateJwt], registerTeacher)
api.put('/updateTS/:id', [validateJwt], updateTS)
api.delete('/deleteTS/:id', [validateJwt], deleteTS)



export default api