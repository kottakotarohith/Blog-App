import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { userAuthorLoginThunk } from '../../redux/slices/UserAuthorSlice';
import { useNavigate } from 'react-router-dom';
import './Signin.css';

function Signin() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { loginUserStatus, currentUser, errorOccurred, errMsg } = useSelector(state => state.userAuthorLoginReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function onLoginFromSubmit(userCred) {
    console.log(userCred);
    dispatch(userAuthorLoginThunk(userCred));
  };

  useEffect(() => {
    if (loginUserStatus && currentUser) {
      if (currentUser.usertype === 'user') {
        navigate('/user-profile');
      } else if (currentUser.usertype === 'author') {
        navigate('/author-profile');
      }
    }
  }, [loginUserStatus, currentUser, navigate]);

  return (
    <div className="homePage">
      <div className="loginCard">
        <p className="fs-3 text-primary mb-4">SignIn</p>
        <form onSubmit={handleSubmit(onLoginFromSubmit)}>
          <div className="mb-4">
            <label htmlFor="user" className="form-check-label me-3" style={{ fontSize: "1.2rem", color: "var(--light-dark-grey)" }}>
              Login as
            </label>
            <br />
            <div className="form-check form-check-inline">
              <input
                type="radio"
                className="form-check-input"
                id="author"
                value="author"
                {...register("usertype", { required: true })}
              />
              <label htmlFor="author" className="form-check-label">
                Author
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                type="radio"
                className="form-check-input"
                id="user"
                value="user"
                {...register("usertype", { required: true })}
              />
              <label htmlFor="user" className="form-check-label">
                User
              </label>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="username" className="form-label">Username</label>
            <input type="text" className="form-control" id="username" {...register("username", { required: true })} />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" id="password" {...register("password", { required: true })} />
          </div>
          <button type="submit" className="btn btn-outline-primary mt-3 d-block mx-auto">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Signin;
