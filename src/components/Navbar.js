import React, { useContext } from "react";
import { signOut, deleteUser, getAuth } from "firebase/auth";

import { useNavigate } from "react-router";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const auth = getAuth();
  const user = auth.currentUser;

  const handleDeleteUser = () => {
    deleteUser(user)
      .then(() => {
        // User deleted.
        navigate("/signup");
      })
      .catch((error) => {});
  };

  const handleLogout = () => {
    // alert('hi')
    navigate("/login");
    signOut(auth);
  };
  return (
    <div className="navContainer">
      {/* <h2 className='dee'> Dee Chat </h2> */}
      <div className="deeDiv">
        <div className="user">
        <img src={currentUser?.photoURL} alt="img"></img>
        <span>{currentUser?.displayName}</span>
        </div>
      <div className="buttonDiv">
        <button onClick={() => handleLogout()} className='buttonA'>Log Out</button>
        <button onClick={() => handleDeleteUser()} className='buttonB'>Delete User</button>
      </div>
      
      </div>
    </div>
  );
}
