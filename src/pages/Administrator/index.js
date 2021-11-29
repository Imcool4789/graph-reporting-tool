import React from 'react'
import NavBar from '../../components/NavBar'
import AdminFileChooser from '../../components/FileChooser/Admin'

const Administrators = () => {
    return (
        <div>
            <NavBar></NavBar>
            Welcome Administrator
            <AdminFileChooser></AdminFileChooser>
        </div>
    )
}

export default Administrators
