import React from "react";
import { Routes, Route} from "react-router-dom";
import Login from "./components/LoginMenu/Login";
import Landing from "./components/Landing/Landing";
import ProtectedRoute from "./utils/ProtectedRoute/ProtectedRoute";
import WelcomeMenu from "./components/WelcomeMenu/WelcomeMenu";
import { AuthProvider } from "./hooks/useAuth";
import SignUp from "./components/SignUp/SignUp";
import HomeBuyer from "./components/Buyer/HomeBuyer/HomeBuyer";
import ProductPage from "./components/Buyer/Products/ProductPage";
import ResultsPage from "./components/Buyer/ResultsPage/ResultsPage";

function App() {
    return(
        <AuthProvider>
            <Routes>    
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />}/>
                <Route element={<ProtectedRoute />}>
                    <Route path="/" element={<Landing />}/>
                    <Route path="/welcome" element={<WelcomeMenu />}/>
                    <Route path="/comprar/*" element={<HomeBuyer search={"featured"}/>} />
                    <Route path="/search-results/*" element={<ResultsPage/>} />
                </Route>
            </Routes>
        </AuthProvider>
        
    );
};

export default App;
