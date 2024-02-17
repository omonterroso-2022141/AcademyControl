import { model, Schema } from 'mongoose'

const courceSchema = Schema({
    name: {
        type: String,
        required: [true, 'Enter de name of the course' ]
    },
    description: {
        type: String,
        required: [true, 'Enter de description of the course']
    }
})

export default model('course', courceSchema)