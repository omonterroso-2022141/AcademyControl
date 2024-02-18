'use strict'


import { Router } from 'express'
import { registerCourse, deleteCourse, updateCourse } from './course.controller.js'

const api = Router()

api.post('/registerCourse', registerCourse)
api.put('/update/:id', updateCourse)
api.delete('/delete/:id', deleteCourse)

export default api 
