import './App.css';
import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import RootLayout from './components/RootLayout';
import Home from './components/home/Home';
import Signup from './components/Signup';
import Signin from './components/Signin';


function App() {

  let router = createBrowserRouter([
    {
      path:'',
      element:<RootLayout/>,
      children:[
        {
          path:"",
          element:<Home/>
        },
        {
          path:"signup",
          element:<Signup/>
        },
        {
          path:"signin",
          element:<Signin/>
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
