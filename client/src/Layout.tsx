import { Outlet } from "react-router-dom";
import Header from "./Components/Header.tsx"
const Layout = () => {
  return (
    <div>
        <Header/>
        <Outlet/>
    </div>
  )
}

export default Layout