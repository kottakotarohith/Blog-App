  import React from 'react'
  import "./AuthorProfile.css"
  import { NavLink, Outlet } from "react-router-dom";
  import {useSelector} from 'react-redux';


  function AuthorProfile() {

    let {currentUser} = useSelector(state=>state.userAuthorLoginReducer)

    return (
      <div className="author-profile p-3 ">
        <ul className="nav  justify-content-around fs-3">
          <li className="nav-item">
            <NavLink className="nav-link" to={`articles-by-author/${currentUser.username}`}  >
              Articles
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="new-article" >
              Add new
            </NavLink>
          </li>
        </ul>
        <Outlet />
      </div>
    )

  }

  export default AuthorProfile