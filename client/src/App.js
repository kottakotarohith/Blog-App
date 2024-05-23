import { lazy, Suspense } from 'react';
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import RootLayout from './RootLayout';
import ErrorPage from './components/ErrorPage';
import Home from './components/home/Home';
import Signin from './components/signin/Signin';
import Signup from './components/signup/Signup';
import UserProfile from './components/userProfile/UserProfile';
import Articles from './components/articles/Articles';
import Article from './components/article/Article';
import AddArticle from './components/addArticle/AddArticle';
import ArticlesByAuthor from './components/articlesByAuthor/ArticlesByAuthor';
import AuthorProfile from './components/authorProfile/AuthorProfile';

//dynamic import of Articles
// const AddArticle=lazy(()=>import('./components/addArticle/AddArticle'))
// const ArticlesByAuthor = lazy(()=>import('./components/articlesByAuthor/ArticlesByAuthor'))

function App() {

  let router = createBrowserRouter([
    {
      path:'',
      element:<RootLayout/>,
      errorElement:<ErrorPage />,
      children:[
        {
          path:"",
          element:<Home/>
        },
        {
          path:"/signup",
          element:<Signup/>
        },
        {
          path:"/signin",
          element:<Signin/>
        },
        {
          path:"/user-profile",
          element:<UserProfile />,
          children:[
            {
              path:"articles",
              element: <Articles />
            },
            {
              path:"article/:articleId",
              element:<Article />
            },
            {
              path:'',
              element:<Navigate to='articles' />
            }
          ]
        },
        {
          path: "/author-profile",
          element: <AuthorProfile />,
          children:[
            {
              path:'new-article',
              element:<AddArticle />
            },
            {
              path:'articles-by-author/:author',
              element: <ArticlesByAuthor />
            },
            {
              path:"article/:articleId",
              element:<Article />
            },
            // {
            //   path:'',
            //   element:<Navigate to='articles-by-author/:author' />
            // }
          ]
        }
      ]
    }
  ])

  return (
    <div>
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;
