import { useState, useEffect } from "react";
import axios from "axios";

export default function UserPanel({ token }) {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);

  useEffect(()=>{
    axios.get("http://localhost:8085/api/question/all", { headers:{Authorization:`Bearer ${token}`}})
         .then(res=>setQuestions(res.data));
  }, []);

  const submit = () => {
    let s=0;
    questions.forEach(q=>{ if(answers[q.id]===q.answer) s++; });
    setScore(s + "/" + questions.length);
  };

  return (
    <div>
      <h2>User Exam</h2>
      {questions.map(q=>(
        <div key={q.id}>
          <p>{q.question}</p>
          {["optionA","optionB","optionC","optionD"].map(opt=>(
            <label key={opt}>
              <input type="radio" name={q.id} value={q[opt]} onChange={e=>setAnswers({...answers, [q.id]:e.target.value})}/>
              {q[opt]}
            </label>
          ))}
        </div>
      ))}
      <button onClick={submit}>Submit</button>
      {score && <h3>Score: {score}</h3>}
    </div>
  );
}
