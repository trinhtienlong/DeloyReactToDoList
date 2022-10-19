import { useState } from 'react';
import './App.css';

function App() {
  const jobJson = JSON.parse(localStorage.getItem("json"))
  const rmoveAll = document.getElementById("removeAll")

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

    rmoveAll.classList.remove("uact");

    setJob('')
  }

  const remove = (e) =>{
    let keyName = e.target.parentElement.querySelector('li').innerText;
    e.target.parentElement.remove()
    for(let i = 0 ; i < jobJson.length ; i++ ){
      if( jobJson[i] === keyName ){
        jobJson.splice(i, 1);
        let jobJsonNew = JSON.stringify(jobJson)
        localStorage.setItem("json", jobJsonNew)
      }
    }
  }

  const removeAll = (e) =>{
    let keyName = e.target.parentElement.parentElement;
    keyName.remove()
    localStorage.removeItem("json");
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
              <li id='removeAll' className='textAlg uact'><span onClick={removeAll}>---- xóa tất cả ----</span></li>
            </ul>
        </div>
      </>
  );
}

export default App;
