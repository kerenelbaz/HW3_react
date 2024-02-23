/* eslint-disable no-unused-vars */
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Register from './components/Register';
import Login from './components/Login';



function App() {
  const [showRegister, setShowRegister] = useState(true);

  const handleSignInClick = () => {
    setShowRegister(false);
  };

  const [users, setUsers] = useState([]);

  function saveUsers(users) {
    localStorage.setItem('users', JSON.stringify(users));
  }

  function registerUser(user){
    // Update the users array immutably
    const updatedUsers = [...users, user];

    // Update state with the new users array
    setUsers(updatedUsers);
    
    // Save updated usersData to local storage
    localStorage.setItem('users', JSON.stringify(users));
  }
  
  const switchToLogin = () => {
    setShowRegister(false);
  };

  return (
    <>
      <div><h2>Hey System Users</h2>
        {showRegister ? (
          <Register switchToLogin={switchToLogin}/>
        ):(
          <Login/>
        )}
        
        
      </div>
      
    </>
  )
}

export default App
