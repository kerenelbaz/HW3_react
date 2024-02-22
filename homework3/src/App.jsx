/* eslint-disable no-unused-vars */
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Register from './components/Register';

function App() {
  const [users, setUsers] = useState();

  function saveUsers(users) {
    localStorage.setItem('users', JSON.stringify(users));
  }

  function registerUser(user){
    const updateUser=[...users,user];
    setUsers(updateUser);
    saveUsers(updateUser);
  }
  return (
    <>
      <div>
        <h2>Register</h2>
        <Register registerUser={registerUser}/>
      </div>
      
    </>
  )
}

export default App
