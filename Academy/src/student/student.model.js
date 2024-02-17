import { Schema, model} from 'mongoose'

export const studentSchema = Schema({
    name:{
        type: String,
        required: true
    },
    email: {
        type: String,
        requerid: true
    },
    username: {
        type: String,
        unique: true,
        requerid: true
    },
    password: {
        type: String,
        requerid: true,
        minLength: [8, 'Password must be 8 characters']
    },
    role: {
        type: String,
        requerid: true,
        uppercase: true,
        enum: ['TEACHER_ROLE','STUDENT_ROLE']
    }
})

export default model('student',studentSchema)