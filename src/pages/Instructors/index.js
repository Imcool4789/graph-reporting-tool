import React from 'react'
import NavBar from '../../components/NavBar'
import InstructorFileChooser from '../../components/FileChooser/Instructor'
const Instructors = () => {
    return (
        <div>
        <NavBar></NavBar>
        Welcome instructor.
        <InstructorFileChooser></InstructorFileChooser>
        </div>
    )
}

export default Instructors
