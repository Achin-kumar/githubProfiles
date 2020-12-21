import { useState, useEffect } from 'react';
import { get } from 'axios';
import { debounce } from 'lodash';
// import logo from './logo.svg';
import './App.css';

function App() {
  const [userInfo, setUserInfo] = useState({})
  const [errorText, setErrorText] = useState('')

  const fetchData = async (username) => {
    try {
      const apiUrl = `https://api.github.com/users/${username}`

      const { data, status } = await get(apiUrl);
      if (status === 200) {
        console.log('data ', data);
        !!errorText ? setErrorText('') :
          setUserInfo(data)
      }
    } catch (error) {
      console.error('error');
      setUserInfo({})
      setErrorText(error.response.data.message)
    }
  }

  return (
    <div className="App">
      <div className='inputBox'> Enter username: <input type='text' onChange={debounce(e => fetchData(e.target.value), 500)}></input></div>
      {/* <table> {errorText === '' ? userInfoTable() : `User ${errorText}`} </table> */}
      <div>
        <div>
          Name: {userInfo.name}
        </div>
        <div>
          Followers:  {userInfo.followers}
        </div>
        <div>
          Location: {userInfo.location}
        </div>
        <div >
          {userInfo.avatar_url !== undefined && <img alt='Users image' src={userInfo.avatar_url}></img>}
        </div>
      </div>
    </div>
  );
}

export default App;
