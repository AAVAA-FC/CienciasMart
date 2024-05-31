import React from "react";
import { Route, Routes } from "react-router-dom";
import HomeBuyer from "./components/Buyer/HomeBuyer/HomeBuyer";
import Landing from "./components/Landing/Landing";
import Login from "./components/LoginMenu/Login";
import SignUp from "./components/SignUp/SignUp";
import WelcomeMenu from "./components/WelcomeMenu/WelcomeMenu";
import { AuthProvider } from "./hooks/useAuth";
import ProtectedRoute from "./utils/ProtectedRoute/ProtectedRoute";
//import ProductPage from "./components/Buyer/Products/ProductPage";
import AddReview from "./components/Buyer/AddReview/AddReview";
import HomeSeller from "./components/Seller/HomeSeller/HomeSeller";
import ProductPageSeller from "./components/Seller/ProductPageSeller/ProductPageSeller";
function App() {
    return(
        <AuthProvider>
            <Routes>    
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />}/>
                <Route path="/homeseller" element={<HomeSeller />}/>
                <Route path="/product-page" element={<ProductPageSeller />}/>
                <Route path="/addreview" element={<AddReview />} />
                <Route element={<ProtectedRoute />}>
                    <Route path="/" element={<Landing />}/>
                    <Route path="/welcome" element={<WelcomeMenu />}/>
                    <Route path="/vender/*" element={<HomeSeller/>} />
                    <Route path="/comprar/*" element={<HomeBuyer search={"featured"}/>} />
                </Route>
            </Routes>
        </AuthProvider>
        
    );
};

export default App;
