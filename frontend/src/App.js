import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./screens/Home";
import Register from "./screens/CustomerScreen/Register";
import Login from "./screens/CustomerScreen/Login";
import CustomerProfile from "./screens/CustomerScreen/CustomerProfile";
import AdminLogin from "./screens/AdminScreen/AdminLogin";
import AllUsers from "./screens/AdminScreen/AllUsers";
import StaffProfile from "./screens/CustomerScreen/StaffProfile";
import UpdateStaffProfile from "./screens/CustomerScreen/UpdateStaffProfile";
import UpdateCustomerProfile from "./screens/CustomerScreen/UpdateCustomerProfile";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/customerprofile" element={<CustomerProfile />} />
          <Route path="/adminlogin" element={<AdminLogin />} />
          <Route path="/allusers" element={<AllUsers />} />
          <Route path="/staffprofile" element={<StaffProfile />} />
          <Route
            path="/updatestaffprofile/:id"
            element={<UpdateStaffProfile />}
          />
          <Route
            path="/updatecustomerprofile/:id"
            element={<UpdateCustomerProfile />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
