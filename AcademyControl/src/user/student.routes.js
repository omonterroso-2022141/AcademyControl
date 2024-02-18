'use strict'

import express from 'express'
import { validateJwt } from '../middlewares/validate-jwt.js'
import { test, login, registerStudent, enrollStudentInCourse} from './student.controller.js'

const api = express.Router()

api.get('/test', validateJwt, test)
api.post('/registerStudent', registerStudent)
api.post('/login', login)
api.post('/enrollStudentInCourse', enrollStudentInCourse)
//api.put('/update/:id', update)
//api.delete('/delete/:id', deleteCour)

export default api 