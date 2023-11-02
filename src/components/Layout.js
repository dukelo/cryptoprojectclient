import React from 'react'
import { Outlet } from 'react-router-dom'
import Nav from './NavComponent'
import Footer from './FooterComponent'

const Layout = ({currentUser, setCurrentUser}) => {
  return (
    <div >
      <Nav currentUser={currentUser} setCurrentUser={setCurrentUser}/>
      <Outlet />
      <Footer />
    </div>
  )
}

export default Layout