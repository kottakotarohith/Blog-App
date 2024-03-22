import React from 'react'
import {useForm} from 'react-hook-form';

function Signup() {

  let {register, handleSubmit, formState: { errors }} = useForm();

  function onRegisterFormSubmit(userData){
    console.log(userData)
  }

  return (
    <div className=" container card p-5 mt-3 mb-3 w-50  bg-body-secondary loginCard"  >
      <p className='fs-3 text-primary '>SignUp</p>
      <form  onSubmit={handleSubmit(onRegisterFormSubmit)}>
        {/* radio */}
        <div className="mb-4">
                  <label htmlFor="user" className="form-check-label me-3"style={{fontSize: "1.2rem",color: "var(--light-dark-grey)"}}>
                    Register as
                  </label>
                  <br/>
                  <div className="form-check form-check-inline">
                    <input
                      type="radio"
                      className="form-check-input"
                      id="author"
                      value="author"
                      {...register("userType")}
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
                      {...register("userType")}
                    />
                    <label htmlFor="user" className="form-check-label">
                      User
                    </label>
                  </div>
                </div>
        <label htmlFor='username' className="form-label">Username</label>
        <input type="text" className="form-control" id="username" {...register("username")}  />
        <label htmlFor="password" className="form-label">Password</label>
        <input type="password" className="form-control" id="password" {...register("password")}  />
        <label htmlFor="email" className='from-label'>Email</label>
        <input type='email' className='form-control ' id="email" {...register("email")} />
        <button type="submit" className='btn btn-outline-primary mt-3 d-block mx-auto '>signup</button>
        
      </form>
    </div>
  )
}

export default Signup