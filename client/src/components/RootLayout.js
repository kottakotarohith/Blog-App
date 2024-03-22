import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './header/Header'
import Footer from './footer/Footer'

function RootLayout() {
    return (
    <div>
        <Header/>
        <div style={{minHeight:"80vh"}}>
            <div className="container">
                <Outlet/>
            </div>
        </div>
        <Footer/>
    </div>
    )
}

export default RootLayout