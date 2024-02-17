'use strict'

import Course from './course.model.js'

export const addCourse = async(req, res) =>{
    try{
        let data = req.body
        let course = new Course(data)
        await course.save()
        return res.send({message: 'Course aggregate successfully'})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error Aggregate course', err})
    }
}


export const deleteCourse = async (req, res) => {
    try {
        let { id } = req.params
        let deleteCourse = await Course.findOneAndDelete({_id: id})
        if(!deleteCourse) return res.status(404).send({message: ' Course not found and not deleted'})        
        return res.send({ message: `Deleted course seccessfully` })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error deleting course' })
    }
}

export const updateCourse = async(req, res) => {
    try{
        let { id } = req.params
        let data = req.body

        let updateCou = await Course.findOneAndUpdate(
            { _id: id },
            data,
            { new: true }
        )

        if(!updateCou) return res.status(401).send({message: 'Course not found and not updated'})
        return res.send({message: 'Updated Course', updateCou})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error updating course'})
    }
}


