import axios from "axios";
import {axiosWithToken} from '../../axiosWithToken'
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Outlet } from "react-router-dom";

function ArticlesByAuthor() {
  const [articlesList, setArticlesList] = useState([]);
  let navigate = useNavigate();
  let { currentUser } = useSelector(
    (state) => state.userAuthorLoginReducer
  );


  const getArticlesOfCurrentAuthor = async()=>{
    let res=await axiosWithToken.get(`http://localhost:4000/author-api/articles/${currentUser.username}`)
    // console.log(res)
    setArticlesList(res.data.payload)
  }

  // console.log(articlesList)
  const readArticleByArticleId=(articleObj)=>{
    navigate(`../article/${articleObj.articleId}`,{state:articleObj})
  }


  useEffect(() => {
    getArticlesOfCurrentAuthor();
  }, []);


    //convert ISO date to UTC data
    function ISOtoUTC(iso) {
      const date = new Date(iso);
      const day = String(date.getUTCDate()).padStart(2, '0');
      const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are 0-indexed
      const year = date.getUTCFullYear();
      return `${day}/${month}/${year}`;
    }

    
  return (
    <div>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4 mt-5">
        {articlesList.map((article) => (
          <div className="col" key={article.articleId}>
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">{article.title}</h5>
                <p className="card-text">
                  {article.content.substring(0, 80) + "...."}
                </p>
                <button className="custom-btn btn-4" onClick={()=>readArticleByArticleId(article)}>
                  <span>Read More</span>
                </button>
              </div>
              <div className="card-footer">
                <small className="text-body-secondary">
                last updated on: {ISOtoUTC(article.dateOfModification)}
                </small>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Outlet />
    </div>
  );
}

export default ArticlesByAuthor;