import React from 'react';
import Navbar from './Navbar';
import Search from './Search';
import Chats  from './Chats';
export default function Sidebar() {
  return (
    <div className='sideBar'>
    <Navbar/>
    <Search/>
    <Chats/>
    </div>
  )
}
