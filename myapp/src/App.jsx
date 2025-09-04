import { useState } from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import AdminPanel from "./components/AdminPanel";
import UserPanel from "./components/UserPanel";

export default function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [role, setRole] = useState(localStorage.getItem("role") || null);
  const [showRegister, setShowRegister] = useState(false);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setToken(null);
    setRole(null);
  };

  if(!token){
    return showRegister ? 
      <Register setShowRegister={setShowRegister}/> : 
      <Login setRole={setRole} setToken={setToken} setShowRegister={setShowRegister}/>;
  }

  return (
    <div>
      <button onClick={logout}>Logout</button>
      {role==="admin" && <AdminPanel token={token}/>}
      {role==="user" && <UserPanel token={token}/>}
    </div>
  );
}
