import React from 'react'
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom'
import { Home, CreatePost, AddDevice } from "./pages"


const App = () => {
  return (
    <BrowserRouter>
      <header className="w-full fixed flex justify-between items-center bg-blue-800 sm:px-8 px-4 py-4 border-b border-blue-800">
        <Link to="/">
          <p>Geologix</p> 
        </Link>
        <Link to="/" className="font-inter font-medium text-white px-2 ml-auto">Home</Link>
        <Link to="/create" className="font-inter font-bold bg-blue-800 text-white px-2 py-1 rounded-md">Smart Contract</Link>
        <Link to="/device" className="font-inter font-bold bg-blue-800 text-white px-2 py-1 rounded-md">Add Device</Link>
      </header>
      <main className="py-8 w-full bg-white  min-h-[calc(100vh)]">
        <Routes>
          <Route path="/create" element={<CreatePost />} />
          <Route path="/" element={<Home />} />
          <Route path="/device" element={<AddDevice />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App

//106e75