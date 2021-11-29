import React from 'react'
import NavBar from '../../components/NavBar'
import DepartmentFileChooser from '../../components/FileChooser/Department'
const Department = () => {
    return (
        <div>
            <NavBar></NavBar>
            This is the department section
            <DepartmentFileChooser></DepartmentFileChooser>
       </div>
    )
}

export default Department
