import Student from './student.model.js'
import { checkPassword, encrypt, checkUpdate } from '../utils/validator.js'
import { generateJwt } from '../utils/jwt.js'



export const testStudent = (req, res) => {
    return res.send('Si funciona')
}

export const director = async (req, res) => {
    try {
        let defaultTeacher = await Student.findOne({ username: 'oscarin' })
        if (!defaultTeacher) {
            let data = {
                name: 'Oscar',
                email: 'omonterroso@gmail.com',
                username: 'oscarin',
                password: 'oscarin1',
                role: 'TEACHER_ROLE'
            }
            data.password = await encrypt(data.password)
            let student = new Student(data)
            await student.save()
        }
    } catch (err) {
        console.error(err)
        return res.status(404).send({ message: 'Error when searching for default user',err})
    }
}


export const registerStudent = async (req, res) => {
    try {
        let data = req.body
        let userStudent = await Student.findOne({ username:data.username })
        if (userStudent) return res.status(406).send({ message: 'Username already used' })
        data.password = await encrypt(data.password)
        data.role = 'STUDENT_ROLE'
        let student = new Student(data)
        student.save()
        return res.send({ message: 'Student successfully added' })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error student could not be added', err })
    }
}

export const login = async (req, res) => {
    try {
        let { username, password } = req.body
        let student = await Student.findOne({ username })
        if (student && await checkPassword(password, student.password)) {
            let logged = {
                studentid: student.id,
                username: student.username,
                name: student.name,
                role: student.role
            }
            let token = await generateJwt(logged)
            return res.send({ message: `Welcome ${student.name}`, logged, token })
        }
        return res.status(401).send({ message: 'Not found' })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Failed to login' })
    }
}


export const registerTeacher = async (req, res) => {
    try {
        let data = req.body
        let { password, username } = req.student
        if (username == 'oscarin' && await checkPassword('oscarin1', password)) {
            let userRegister = await Student.findOne({ username: data.username })
            if (userRegister) return res.status(400).send({ message: 'Username already exist' })
            data.password = await encrypt(data.password)
            data.role = 'TEACHER_ROLE'
            let userStudent = new Student(data)
            userStudent.save()
            return res.send({ message: 'Permission has ben granted' })
        }
        return res.status(401).send({ message: 'You do not have an authorization of this rank' })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error when granting permissions', err })
    }
}

export const updateTS = async(req, res)=>{
    try{
        let { id } = req.params
        let { studentid, role } = req.student
        let data = req.body
        if(role == 'STUDENT_ROLE')
            if(id!=studentid) 
                return res.status(403).send({message: 'You cannot update this information'})
        let update = checkUpdate(data, id)
        if(!update) return res.status(400).send({message: 'Have sumbmitted some data that cannot be updated or missing data'})
        let updatedTS = await Student.findOneAndUpdate(
            {_id: id},
            data,
            {new: true}
        )
        if(!updatedTS) return res.status(401).send({message: 'Student or Reacher not found and not updated'})
        return res.send({message: 'Updated student or teacher...', updatedTS})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error updating '})
    }
}

export const deleteTS = async(req,res)=>{
    try{
        let { id } = req.params
        let { studentid, role } = req.student
        if(role == 'STUDENT_ROLE')
            if(!(id==studentid))
                return res.status(403).send({message: 'You cannot update this information'})
        let deleteTS = await Student.findOneAndDelete({_id: id})
        if(!deleteTS) return res.status(404).send({message: 'Student or teacher not foud and not deleted'})
        return res.send({message: `The student or teacher ${deleteTS.username} deleted successfully`})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error deleting student or teacher'})
    }
}







