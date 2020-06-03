import React, {useEffect} from 'react';
import axios from 'axios';

import './App.css';

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZWQ1ZDZmYTY3MGQyZTczZWQ3Mzk4MjUiLCJpYXQiOjE1OTExNDcxOTR9.afi5ffXlFOELpalh0ZRCOwrfL1gQObWmlloJ-mBOw1M'
const config = {
  headers: {
    'Accept': '*/*',
    'auth-token': token
  }
}
function App() {
  useEffect(()=>{
    const getUser = async () =>{
      try{
      const url = 'http://localhost:3001/api/user/user-info';
      const res = await axios.get(url, config)
      console.log(res)
    } catch(err){
      console.log(err.response.data)
    }
    };
    getUser()
  },[])
  return (
    <div className="App">
      
    </div>
  );
}

export default App;
