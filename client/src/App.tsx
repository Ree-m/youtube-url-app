import './App.css'
import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Home from './pages/Home';
import Share from './pages/Share';
import { UserContext } from "./contexts/UserContext";
import { useContext } from 'react';

function App() {
  const { user } = useContext(UserContext)


  return (
    <Routes>
      <Route path={"/"} element={<Layout/>}>
        <Route index element={<Home/>}/>
        <Route element={user.id!==""?<Share/>:<Home/>} path={"/share"}/>

      </Route>
    </Routes>
  )
}

export default App
