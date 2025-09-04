import { useState } from "react";
import axios from "axios";

export default function Register({ setShowRegister }) {
  const [form, setForm] = useState({username:"", password:"", role:"USER"});

  const register = async () => {
    try {
      let res = await axios.post("http://localhost:8085/api/auth/register", form);
      alert(res.data.message);
      if(res.data.message==="Registered successfully") setShowRegister(false);
    } catch(e) { alert("Registration failed"); }
  };

  return (
    <div>
      <h2>Register</h2>
      <input placeholder="Username" value={form.username} onChange={e=>setForm({...form, username:e.target.value})}/>
      <input placeholder="Password" type="password" value={form.password} onChange={e=>setForm({...form, password:e.target.value})}/>
      <select value={form.role} onChange={e=>setForm({...form, role:e.target.value})}>
        <option value="ADMIN">Admin</option>
        <option value="USER">User</option>
      </select>
      <button onClick={register}>Register</button>
      <p onClick={()=>setShowRegister(false)} style={{cursor:"pointer", color:"blue"}}>Back to Login</p>
    </div>
  );
}
