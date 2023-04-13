
import React, { useState } from "react";
import {  useNavigate,Link } from 'react-router-dom';
import './Style.css';
import { BiConversation } from "react-icons/bi";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

export default function Login() {
  const [error, setError] = useState(false);
  // const [userErr, setUserErr] = useState(false);
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/")
    } catch (error) {
        console.log(error.message);
        setError('User not found!');
      
    
      // setError(true);
    }
    // try {
    //   // await signInWithEmailAndPassword(auth, email, password);
    //   // navigate("/")
    // }
    // if (err.message === "EMAIL_NOT_FOUND"){

    // }
    // catch (userErr) {
    //   setUserErr(true)

    // }

    
  };

  return (
     <div className='signUp'>
        <nav>
            <BiConversation className='icon'></BiConversation>
            <h1> Dee Chat </h1> 
            
         </nav>
        <div className='signUp-container'>
            <header> Log In</header>
            <form onSubmit={handleSubmit}>
            
                <label htmlFor="Display">Email</label>
                <input type="email" placeholder='Email@email.com' />

                <label htmlFor="Display">Password</label>
                <input type="password" placeholder='******'/>
                <button>Log In</button>
                <span> {error }</span>
                {/* {userErr && <span>User not found signup below!</span>} */}
            </form>
            <p>Already have an account? <Link to= '/signup' className='click'> Sign Up</Link></p>
        </div>
    </div>
  )
}
