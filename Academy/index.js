import { initServer } from './configs/app.js'
import { connect } from './configs/mongo.js'
import { director } from './src/student/student.controller.js'

initServer()
connect()
director()