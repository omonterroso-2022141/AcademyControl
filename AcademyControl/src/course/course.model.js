import { model, Schema } from 'mongoose'

const courceSchema = Schema({
    name: {
        type: String,
        required: [true, 'Course name is required' ]
    },
    description: {
        type: String,
        required: [true, 'The course description is mandatory']
    }
})

export default model('course', courceSchema)