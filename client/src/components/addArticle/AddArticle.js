import React from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from "react-redux";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


function AddArticle() {

  let {register, handleSubmit} = useForm();
  let { currentUser } = useSelector(
    (state) => state.userAuthorLoginReducer
  );
  let [err, setErr] = useState("");
  let navigate = useNavigate();
  let token = localStorage.getItem('token')


  //create axios with token
  const axiosWithToken =  axios.create({
    headers: {Authorization: `Bearer ${token}`}
  })

  const postNewArticle = async (article)=>{

    article.dateOfCreation = new Date();
    article.dateOfModification = new Date();
    article.articleId = Date.now();
    article.username = currentUser.username;
    article.comments = [];
    article.status = true;
    console.log(article)

    //http post request
    let res = await axiosWithToken.post('http://localhost:4000/author-api/article',article)
    // console.log(res)
    if(res.data.message == "new article created"){
      navigate(`/author-profile/articles-by-author/${currentUser.username}`)
    }else{
      setErr( res.data.message)
    }

  }


  return (
    <div className='container mx-auto  mt-3 bg-info-subtle rounded-5 p-3  ' style={{width : "70vw"}}>
      <p className='mx-auto text-center fs-3'>Welcome to Your Creative Space...</p>
      {/* form */}
      <form className='mx-auto mt-3 '   onSubmit={handleSubmit(postNewArticle)}>

        {/* title section */}
        <div className='mb-4'>
          <label htmlFor="title" className='form-label ' >Title :</label>
          <input type='text' className='form-control ' id='title'  {...register("title") }   ></input>
        </div>

        {/* category section */}
        <div className='mb-4'>
          <label htmlFor="category" className='form-label ' >Category :</label>
          <select className='form-select' id='category' {...register("category") }   defaultValue="">
            <option value="" disabled >Select Category</option>
            <option value="Web Development">Web Development</option>
            <option value="Mobile Development">Mobile Development</option>
            <option value="Artificial Intelligence">Artificial Intelligence</option>
            <option value="Cyber Security">Cyber Security</option>
          </select>
        </div>

        {/* content section */}
        <div className='mb-4'>
          <label htmlFor="content" className='form-label '>Content :</label>
          <textarea className='form-control ' id="content" rows="7"   {...register("content") }></textarea>
        </div>

        {/* post button */}
        <div className='d-flex justify-content-end mt-3 pb-4'>
          <button type='submit' className='btn btn-primary '>Post</button>
        </div>


      </form>
    </div>
  )
}

export default AddArticle