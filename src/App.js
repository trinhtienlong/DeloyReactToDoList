import { useState } from 'react';
import './App.css';

function App() {
  const jobJson = JSON.parse(localStorage.getItem("json"))

  const [job, setJob] = useState('')
  console.log(job);

  const [jobs, setJobs] = useState(jobJson ?? [])

  const onSubmit = () =>{
    job !== "" &&
    setJobs(save => {
      const newJobs = [...save, job]

      const jobJson = JSON.stringify(newJobs)
      localStorage.setItem("json", jobJson)

      return newJobs
    })
    setJob('')
  }

  const remove = (e) =>{
    let keyName = e.target.parentElement.querySelector('li').innerText;
    e.target.parentElement.remove()
    for(let i = 0 ; i < jobJson.length ; i++ ){
      if( jobJson[i] == keyName ){
        jobJson.splice(i, 1);
        let jobJsons = JSON.stringify(jobJson)
        localStorage.setItem("json", jobJsons)
      }
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
                  <div className='flex' key={index}>
                    <li>{item}</li>
                    <button onClick={remove}>xóa</button>
                  </div>
                )
              }) }
            </ul>
        </div>
      </>
  );
}

export default App;
