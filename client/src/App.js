import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import ResumeDetails from "./pages/ResumeDetails";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import { Toaster } from "react-hot-toast";

function App() {

    return (
        
        <div>  
            <Toaster position="top-right"/>
        <Routes>
            
            <Route path="/" element={<Login />} />

            <Route path="/signup" element={<Signup />} />
            <Route
path="/profile"
element={<Profile/>}
/>

            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute>

                        <Dashboard />

                    </ProtectedRoute>
                }
            />
            <Route
                path="/resume/:id"
                element={<ResumeDetails />}
            />
            
        </Routes>
        
</div>

    );

}

export default App;