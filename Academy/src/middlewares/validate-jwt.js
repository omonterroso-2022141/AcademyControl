'use strict'

import jwt from 'jsonwebtoken'
import Student from '../student/student.model.js'

export const validateJwt = async(req,res,next)=>{
    try{
        let secretKey = process.env.SECRET_KEY
        let { token } = req.headers
        if(!token) return res.status(401).send({message: 'Unauthorized'})
        let { studentid } = jwt.verify(token,secretKey)
        let student = await Student.findOne({_id:studentid})
        if(!student) return res.status(404).send({message: 'User not found - Unauthorized'})
        req.student = student
        req.student.studentid = studentid
        next()
    }catch(err){
        console.error(err)
        return res.status(401).send({message: 'Invalid token or expired'})
    }
}

