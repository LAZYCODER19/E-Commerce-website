import { Route, Routes } from "react-router-dom"
import Sidebar from "../components/Sidebar"
import Addproduct from "../components/Addproduct"
import ListProduct from "../components/ListProduct"

const Admin = () => {
  return (
    <div className="lg:flex">
        <Sidebar></Sidebar>
        <Routes>
            <Route path="/" element={<Addproduct></Addproduct>}></Route>
            <Route path="/listproduct" element={<ListProduct></ListProduct>}></Route>
        </Routes>
    </div>
  )
}

export default Admin