import Navbar from "./pages/Navbar";
import {Navigate, Route, Routes} from "react-router-dom";
import Category from "./pages/Category";
import Home from "./pages/Home";
import ProductPage from "./pages/ProductPage";
import Search from "./pages/Search";
import Layout from "./pages/Layout";

function App() {
  return (
    <div>
      <Navbar/>
        <Routes>
            <Route path={"/category/:category/products"} element={<Category/>}/>
            <Route path={"/product/:productId"} element={<ProductPage/>}/>
            <Route path={"/products/search/:searchQuery"} element={<Search/>}/>
            <Route path={"/products/search/"}  element={<Navigate to={"/"} replace />}/>
            <Route index element={<Home/>}/>
            <Route path={"/"} element={<Layout/>}/>
        </Routes>
    </div>
  );
}

export default App;
