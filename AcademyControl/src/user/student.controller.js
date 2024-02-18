'use strict'

import User from './student.model.js'
import { encrypt, checkPassword} from '../utils/validator.js'
import { generateJwt } from '../utils/jwt.js'

export const test = (req, res)=>{
    return res.send('Welcome Teacher')
}


export const registerStudent = async(req, res) =>{
    try{
        let data = req.body

        let user = await User.findOne({ username: data.username }).populate('courses');
        if (user && user.courses.length >= 3) {
            return res.status(400).send({ message: 'El estudiante ya está inscrito en 3 cursos.' });
        }


        data.password = await encrypt(data.password)

        let newuser = new User(data)
        await newuser.save()
        return res.send({message: 'Registered successfully'})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error registering student', err})
    }
}

export const enrollStudentInCourse = async (req, res) => {
    try {
        const { studentId, courseId } = req.body;

        // Verificar si el estudiante existe
        const student = await User.findById(studentId);
        if (!student) {
            return res.status(404).send({ message: 'Estudiante no encontrado.' });
        }

        // Verificar si el estudiante ya está inscrito en 3 cursos
        if (student.courses.length >= 3) {
            return res.status(400).send({ message: 'El estudiante ya está inscrito en 3 cursos.' });
        }

        // Verificar si el curso existe
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).send({ message: 'Curso no encontrado.' });
        }

        // Agregar el ID del curso al estudiante
        student.courses.push(courseId);
        await student.save();

        return res.send({ message: 'Estudiante inscrito en el curso correctamente.' });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error al inscribir al estudiante en el curso.', err });
    }
}

export const login = async(req, res) =>{
    try{
        let { username, password } = req.body
        let user = await User.findOne({username})

        if(user && await checkPassword(password, user.password)){
            let loggedUser = {
                uid: user._id,
                username: user.username,
                name: user.name,
                role: user.role
            }
            let token = await generateJwt(loggedUser)
          
            return res.send({
                msg: `Welcome ${user.name}`,
                loggedUser,
                token
            })
        }
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Failed to login', err})
    }
}

