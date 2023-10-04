import './App.css'
import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Home from './pages/Home';
import Share from './pages/Share';

function App() {
  

  return (
    <Routes>
      <Route path={"/"} element={<Layout/>}>
        <Route index element={<Home/>}/>
        <Route path={"/share"} element={<Share/>}/>

      </Route>
    </Routes>
  )
}

export default App
