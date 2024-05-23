import React, { useState } from 'react';
import './Signup.css';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [err, setErr] = useState('');

  async function onRegisterFormSubmit(userData) {
    const endpoint = userData.usertype === 'user' ? "http://localhost:4000/user-api/user" : "http://localhost:4000/author-api/author";
    try {
      const res = await axios.post(endpoint, userData);
      if (res.data.message === 'new user created' || res.data.message === 'new author created') {
        navigate('/signin');
      } else {
        setErr(res.data.message);
      }
    } catch (error) {
      setErr('An error occurred. Please try again.');
    }
  }

  return (
    <div className="homePage">
      <div className="signupCard">
        <p className="fs-3 text-primary mb-4">SignUp</p>
        <form onSubmit={handleSubmit(onRegisterFormSubmit)}>
          {err && <p className="text-danger fs-6 fst-italic">{err}</p>}
          <div className="mb-4">
            <label htmlFor="user" className="form-check-label me-3" style={{ fontSize: "1.2rem", color: "var(--light-dark-grey)" }}>
              Register as
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
          <div className="form-group">
            <label htmlFor="email" className="form-label">Email</label>
            <input type="email" className="form-control" id="email" {...register("email", { required: true })} />
          </div>
          <button type="submit" className="btn btn-outline-primary mt-3 d-block mx-auto">Signup</button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
