import React, { useState } from "react";
import "./Style.css";
import { BiConversation } from "react-icons/bi";
import image from "./assets/Profile_avatar_placeholder_large.png";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
    const [err, setErr] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
  
    const handleSubmit = async (e) => {
      setLoading(true);
      e.preventDefault();
      const displayName = e.target[0].value;
      const email = e.target[1].value;
      const password = e.target[2].value;
      const file = e.target[3].files[0];
  
      try {
        //Create user
        const res = await createUserWithEmailAndPassword(auth, email, password);
  
        //Create a unique image name
        const date = new Date().getTime();
        const storageRef = ref(storage, `${displayName + date}`);
  
        await uploadBytesResumable(storageRef, file).then(() => {
          getDownloadURL(storageRef).then(async (downloadURL) => {
            try {
              //Update profile
              await updateProfile(res.user, {
                displayName,
                photoURL: downloadURL,
              });
              //create user on firestore
              await setDoc(doc(db, "users", res.user.uid), {
                uid: res.user.uid,
                displayName,
                email,
                photoURL: downloadURL,
              });
  
              //create empty user chats on firestore
              await setDoc(doc(db, "userChats", res.user.uid), {});
              navigate("/home");
            } catch (err) {
              console.log(err);
              setErr(true);
              setLoading(false);
            }
          });
        });
      } catch (err) {
        setErr(true);
        setLoading(false);
      }
    };
    
  return (
    <div className="signUp">
      <nav>
        <BiConversation className="icon"></BiConversation>
        <h1> Dee Chat </h1>
      </nav>
      <div className="signUp-container">
        <header> Sign Up</header>
        <form onSubmit={handleSubmit}>
          <label htmlFor="Name">Display Name</label>
          <input type="text" placeholder="Name" />

          <label htmlFor="Display">Email</label>
          <input type="email" placeholder="Email@email.com" />

          <label htmlFor="Display">Password</label>
          <input type="password" placeholder="******" />
          <input style={{ display: "none " }} type="file" id="file" />
          <label htmlFor="file" className="file" >
            <img src={image} alt="" />
            <span>Add a profile picture</span>
          </label>
          <button>Sign Up</button>
          {loading &&<span>Uploading and compressing the image please wait...</span>}
          {err && <span>Something went wrong</span>}
        </form>
        <p>
          Already have an account? <Link  to ='/login' className="click"> Log In</Link>
        </p>
      </div>
    </div>
  );
}
