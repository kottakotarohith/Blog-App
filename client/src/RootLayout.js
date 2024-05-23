import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from './components/footer/Footer'
import Header from './components/header/Header'

function RootLayout() {
    return (
    <div>
        <Header/>
        <div style={{minHeight:"80vh"}}>
            <div className=" ">

                <Outlet/>

            </div>
        </div>
        
        <Footer/>
    </div>
    )
}

export default RootLayout