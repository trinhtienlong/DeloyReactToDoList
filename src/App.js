import { useState } from 'react';
import './App.css';

function App() {
  const jobJson = JSON.parse(localStorage.getItem("json"))

  const [job, setJob] = useState('')
  console.log(job);

  const [jobs, setJobs] = useState(jobJson ?? [])

  const onSubmit = () =>{
    if(job !== ""){
      setJobs(save => {
        const newJobs = [...save, job]
  
        const jobJson = JSON.stringify(newJobs)
        console.log(jobJson);
        localStorage.setItem("json", jobJson)
  
        return newJobs
      })
      setJob('')
    }
  }

  return (
      <>
        <h1 className='cl-white'>Todolist App</h1>
        <div className='bgr-black'>
            <input value={job} onChange={e => setJob(e.target.value)}></input>
            <button onClick={onSubmit}>Submit</button>
            <ul className='bgr-white'>
              { jobs.map((item, index)=>{
                return(
                  <li key={index}>{item}</li>
                )
              }) }
            </ul>
        </div>
      </>
  );
}

export default App;
