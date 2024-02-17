import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import { config } from 'dotenv'
import studentRouter from '../src/student/student.routes.js'

const app = express()
config()
const port = process.env.PORT | 2880

app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cors())
app.use(helmet())
app.use(morgan('dev'))

app.use(studentRouter)

export const initServer = ()=> {
    app.listen(port)
    console.log(`Serverd HTTP running in port ${port}`)
}