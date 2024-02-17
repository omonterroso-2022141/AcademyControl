'use strict'

//Rutas del usuario
import { Router } from 'express'
import { addCourse, deleteCourse, updateCourse } from './course.controller.js'

const api = Router()

api.post('/addCourse', addCourse)
api.put('/update/:id', updateCourse)
api.delete('/delete/:id', deleteCourse)

export default api 
