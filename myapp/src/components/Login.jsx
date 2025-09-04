import { useState } from "react";
import axios from "axios";

export default function Login({ setToken, setRole, setShowRegister }) {
  const [form, setForm] = useState({username:"", password:""});

  const login = async () => {
    try {
      const res = await axios.post("http://localhost:8085/api/auth/login", {
        username: form.username.trim(),
        password: form.password
      });

      if(res.data.token){
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("role", res.data.role.toLowerCase());
        setToken(res.data.token);
        setRole(res.data.role.toLowerCase());
      } else {
        alert(res.data.message);
      }
    } catch(e) {
      alert(e.response?.data?.message || "Login failed");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input placeholder="Username" value={form.username} 
             onChange={e => setForm({...form, username: e.target.value})} />
      <input placeholder="Password" type="password" value={form.password} 
             onChange={e => setForm({...form, password: e.target.value})} />
      <button onClick={login}>Login</button>
      <p onClick={()=>setShowRegister(true)} style={{cursor:"pointer", color:"blue"}}>
        Register Here
      </p>
    </div>
  );
}
