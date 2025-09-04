import { useState } from "react";
import axios from "axios";

export default function AdminPanel({ token }) {
  const [q, setQ] = useState({question:"", optionA:"", optionB:"", optionC:"", optionD:"", answer:""});

  const addQuestion = async () => {
    try {
      let res = await axios.post("http://localhost:8085/api/question/add", q, {
        headers:{Authorization:`Bearer ${token}`}
      });
      alert("Question added");
      setQ({question:"", optionA:"", optionB:"", optionC:"", optionD:"", answer:""});
    } catch(e){ alert("Add question failed"); }
  };

  return (
    <div>
      <h2>Admin Panel - Add Question</h2>
      <input placeholder="Question" value={q.question} onChange={e=>setQ({...q, question:e.target.value})}/>
      <input placeholder="Option A" value={q.optionA} onChange={e=>setQ({...q, optionA:e.target.value})}/>
      <input placeholder="Option B" value={q.optionB} onChange={e=>setQ({...q, optionB:e.target.value})}/>
      <input placeholder="Option C" value={q.optionC} onChange={e=>setQ({...q, optionC:e.target.value})}/>
      <input placeholder="Option D" value={q.optionD} onChange={e=>setQ({...q, optionD:e.target.value})}/>
      <input placeholder="Answer" value={q.answer} onChange={e=>setQ({...q, answer:e.target.value})}/>
      <button onClick={addQuestion}>Add Question</button>
    </div>
  );
}
