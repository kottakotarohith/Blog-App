import "./UserProfile.css";
import { NavLink, Outlet } from "react-router-dom";

function UserProfile() {
  return (
    <div className="userProfilebg p-5 ">
     <NavLink to='articles' className='fs-4  articles text-danger border border-info  nav-link mt-4 d-inline-block p-3 '>Articles</NavLink>
      <div >
      <Outlet />
      </div>
    </div>
  );
}

export default UserProfile;