import React from 'react'
import { Outlet } from 'react-router-dom'
// import Header from './Header.jsx'
import Sidebar from './Sidebar.jsx'

function Layout() {
  return (
    <div className="w-full h-screen flex bg-gradient-to-r bg-gray-100">
      {/* Left Sidebar */}
      <div className="w-[16%] ">
        <Sidebar />
      </div>
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-y-auto bg-gray-100">
        {/* Main Section */}
        <main className="flex-1  overflow-y-auto p-10 py-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default Layout
