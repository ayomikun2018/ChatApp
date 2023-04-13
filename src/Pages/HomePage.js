import React from 'react'
import './Style.css';
import Sidebar from '../components/Sidebar'
import Chat from '../components/Chat'
export default function HomePage() {
  return (
    <div className='home'>
    <div  className='container'>
    <Sidebar/>
     <Chat/>
    </div>
   
    </div>
    
  )
}
