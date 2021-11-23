import React from 'react'
import NavBar from '../../components/NavBar'
import InstructorFileChooser from '../../components/FileChooser/Instructor'
const Instructor = () => {
    return (
        <div>
        <NavBar></NavBar>
        Welcome instructor.
        <InstructorFileChooser></InstructorFileChooser>
        </div>
    )
}

export default Instructor
