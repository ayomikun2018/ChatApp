
import './App.css';
import HomePage from './Pages/HomePage';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import {Route, Routes} from 'react-router';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import { Navigate } from 'react-router';

function App() {
  const currentUser = useContext(AuthContext)
  console.log(currentUser);
  const ProtectedRoute = ({ children }) => {
  if (!currentUser) {
    return <Navigate to="/login" />;
  }
    return children
  };


  return (
   <Routes>
    <Route path="/">
      <Route
            index
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />
          <Route index element = {<HomePage/>}/>
          <Route exact path= 'login' element = {<Login/>}/>
          <Route exact path= 'signup' element = {<Signup/>}/>
    

   </Route>

   </Routes>
  
  );
}

export default App;
