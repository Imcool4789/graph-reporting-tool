import React from 'react'
import NavBar from '../../components/NavBar'
import AdminFileChooser from '../../components/FileChooser/Admin'

const Administrator = () => {
    return (
        <div style={{backgroundColor:"white;"}}>
            <NavBar></NavBar>
            <AdminFileChooser></AdminFileChooser>
        </div>
    )
}

export default Administrator
