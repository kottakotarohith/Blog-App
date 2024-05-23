import React, {useEffect} from 'react'
import './Header.css'
import inkverseLogo from "../../images/inkverseLogo.jpg"
import { NavLink } from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import { resetState } from '../../redux/slices/UserAuthorSlice'

function Header() {
    
    let {loginUserStatus,currentUser, errorOccurred, errMsg} = useSelector(state => state.userAuthorLoginReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        // Restore authentication state from local storage on component mount
        const storedLoginStatus = localStorage.getItem('loginUserStatus');
        const storedUser = JSON.parse(localStorage.getItem('currentUser'));
        // console.log(storedUser)
        if (storedLoginStatus && storedUser) {
          dispatch({
            type: 'RESTORE_AUTH_STATE',
            payload: {
              loginUserStatus: JSON.parse(storedLoginStatus),
              currentUser: storedUser
            }
          });
        }
      }, []);

    function signOut(){
        //remove token
        localStorage.removeItem('token');
        localStorage.removeItem('currentUser');
        dispatch(resetState())
    }
    
    return (
        <div >
            <div className='navbar bgc  border-danger-subtle border-bottom-0'>
                <div className='navbar-brand mx-3 my-0 py-0 '>
                <img src={inkverseLogo} alt="Logo"style={{maxHeight:"10vh"}}></img>
                </div>
                <ul className='nav'>
                {currentUser.username !== 'undefined' && loginUserStatus ?
                    <>
                        <p className='fs-3 usernameColor'>Welcome {currentUser.username},</p>
                        <li className='nav-item'>
                            <NavLink className="nav-link fs-5 navComponent" to='' onClick={signOut}>SignOut</NavLink>
                        </li>
                    </>
                    :
                    <>
                        <li className='nav-item'>
                            <NavLink className="nav-link fs-5 navComponent" to=''>Home</NavLink>
                        </li>
                        <li className='nav-item'>
                            <NavLink className="nav-link fs-5 navComponent" to='signup'>SignUp</NavLink>
                        </li>
                        <li className='nav-item'>
                            <NavLink className="nav-link fs-5 navComponent" to='signin'>SignIn</NavLink>
                        </li>
                    </>
                }
                </ul>
            </div>
        </div>
        
    )

}

export default Header