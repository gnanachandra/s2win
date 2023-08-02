import React from "react"
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import Home from "./components/Home"
import Client from "./components/Client"
import {Toaster} from "react-hot-toast"
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/clients/:id" element={<Client/>}/>
      </Routes>
      <Toaster position="top-right"/>
    </Router>
  )
}

export default App