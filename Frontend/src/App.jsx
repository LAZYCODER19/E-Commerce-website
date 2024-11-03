import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Category from "./pages/Category"
import Product from "./pages/Product"
import Cart from "./pages/Cart";
import Login from "./pages/Login"
import Footer from "./components/Footer";

import bannermens from "./assets/bannermens.png"
import bannerwomens from "./assets/bannerwomens.png"
import bannerkids from "./assets/bannerkids.png"

export default function App() {
  return (
    <main className=" bg-primary text-tertiary">
        <BrowserRouter>
          <Header></Header>
          <Routes>
            <Route path="/" element={<Home></Home>}></Route>
            <Route path="/mens" element={<Category category="men" banner={bannermens}></Category>}></Route>
            <Route path="/womens" element={<Category category="women" banner={bannerwomens}></Category>}></Route>
            <Route path="/kids" element={<Category  category="kid" banner={bannerkids}></Category>}></Route>
            <Route path="/product" element={<Product></Product>}>
              <Route path=":productId" element={<Product></Product>}></Route>
            </Route>
            <Route path="/cart-page" element={<Cart></Cart>}></Route>
            <Route path="/login" element={<Login></Login>}></Route>
          </Routes>
          <Footer></Footer>
        </BrowserRouter>
    </main>
  )
}