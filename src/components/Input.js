import React, { useContext, useState } from "react";

import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../firebase";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
// import { ImImage } from "react-icons/im";
// import { IoMdAttach} from "react-icons/io";

export default function Input() {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const handleSend = async () => {
  if (img) {
    const storageRef = ref(storage, uuid());

    const uploadTask = uploadBytesResumable(storageRef, img);

    uploadTask.on(
      (error) => {
        //TODO:Handle Error
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          await updateDoc(doc(db, "chats", data.chatId), {
            messages: arrayUnion({
              id: uuid(),
              text,
              senderId: currentUser.uid,
              date: Timestamp.now(),
              img: downloadURL,
            }),
          });
        });
      }
    );
  } else {
    await updateDoc(doc(db, "chats", data.chatId), {
      messages: arrayUnion({
        id: uuid(),
        text,
        senderId: currentUser.uid,
        date: Timestamp.now(),
      }),
    });
  }

  await updateDoc(doc(db, "userChats", currentUser.uid), {
    [data.chatId + ".lastMessage"]: {
      text,
    },
    [data.chatId + ".date"]: serverTimestamp(),
  });

  await updateDoc(doc(db, "userChats", data.user.uid), {
    [data.chatId + ".lastMessage"]: {
      text,
    },
    [data.chatId + ".date"]: serverTimestamp(),
  });

  setText("");
  setImg(null);
};
  return (
    <div className='input'>
      <input type='text' placeholder='Type Something...'  onChange={(e) => setText(e.target.value)}
        value={text}></input>
      <div className='send'>
      {/* <img src={Attach} alt=""  className="icons"/> */}
      
      <input type='file' style={{display:'none'}} id=''  onChange={(e) => setImg(e.target.files[0])} ></input>
      <label htmlFor='file'>
      {/* <img src={Img} alt="" className='icons iconB' /> */}
      </label>
      <button onClick={handleSend}>Send</button>


      </div>
    </div>
  )
}
