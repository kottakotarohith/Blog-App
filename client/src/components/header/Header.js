import React from 'react'
import blogLogo from "../../images/blogLogo.png"
import { NavLink } from 'react-router-dom'


function Header() {

    return (
        <div >
            <div className='navbar bg-body-secondary '>
                <div className='navbar-brand mx-3 my-0 py-0 '>
                <img src={blogLogo} alt="Logo"style={{maxHeight:"10vh"}}></img>
                </div>
                <ul className='nav'>
                  {/* link to home */}
                    <li className='nav-item '>
                    <NavLink className="nav-link text-info text-decoration-underline  fs-5" to=''> Home</NavLink>
                    </li>
                  {/* link to Register */}
                    <li className='nav-item '>
                    <NavLink className="nav-link text-info text-decoration-underline fs-5" to='signup'> SignUp</NavLink>
                    </li>{/* link to Login */}
                    <li className='nav-item '>
                    <NavLink className="nav-link text-info text-decoration-underline fs-5" to='signin'> SignIn</NavLink>
                    </li>
                </ul>
            </div>
        </div>
        
    )

}

export default Header