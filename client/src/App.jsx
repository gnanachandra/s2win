import React from "react"
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import Home from "./components/Home"
import Client from "./components/Client"
import Branch from "./components/Branch"
import {Toaster} from "react-hot-toast"
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/clients/:id" element={<Client/>}/>
        <Route path="/branches/:id" element={<Branch/>}/>
      </Routes>
      <Toaster position="top-right"/>
    </Router>
  )
}

export default App