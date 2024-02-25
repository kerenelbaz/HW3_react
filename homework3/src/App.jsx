import { useState, useEffect } from 'react';
import Register from './components/Register';
import Login from './components/Login';
import EditDetails from './components/EditDetails';
import Profile_new from './components/Profile_new';
import SystemAdmin from './components/SystemAdmin';

function App() {
  // State variables to manage user data, authentication status, and editing profile status
  //const [users, setUsers] = useState([]); // state variable to manage user data
  const [showRegister, setShowRegister] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // flag state variable to know if there is user that logged in or not
  const [userLogged, setUserLogged] = useState(JSON.parse(localStorage.getItem('userLogged'))); //state variable to get the user who is logged in
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  // eslint-disable-next-line no-unused-vars
  // const handleSignInClick = () => {
  //   setShowRegister(false);
  // };

  // eslint-disable-next-line no-unused-vars
  // function registerUser(user) {
  //   const updatedUsers = [...users, user];
  //   setUsers(updatedUsers);
  //   localStorage.setItem('users', JSON.stringify(users));
  // }

  // useEffect(() => {
  //   const userLogged = localStorage.getItem('userLogged');
  //   if (userLogged) {
  //     setIsLoggedIn(true);
  //   }
  // }, [isLoggedIn]); // Include isLoggedIn as a dependency
  useEffect(() => {
    const userLoggedString = localStorage.getItem('userLogged');
    if (userLoggedString) {
      try {
        const userLogged = JSON.parse(userLoggedString);
        setUserLogged(userLogged);
        setIsLoggedIn(true);
        if(userLogged.username === 'admin')
          setIsAdmin(true);
      } catch (error) {
        console.error('Error parsing userLogged data:', error);
        // Handle parsing error (e.g., reset userLogged state)
        setUserLogged(null);
        setIsLoggedIn(false);
      }
    }
  }, []);

  const switchToLogin = () => {
    setShowRegister(false);
  };

  //function that gets triggered when the user successfully logs in. and save the active user to the local storage
  const handleLogin = (user) => {
    setUserLogged(user);
    localStorage.setItem('userLogged', JSON.stringify(user));
    setIsLoggedIn(true);
    if(user.username === 'admin')
          setIsAdmin(true);
  };
  
  const handleLogout = () => {
    setUserLogged(null);
    localStorage.removeItem('userLogged');
    setIsLoggedIn(false);
    setIsAdmin(false)
  };

  // const handleEditClick = () => {
  //   setEditing(true);
  // };

  const handleCancel = () => {
    setIsEditingProfile(false);
  };

  const handleSaveChanges = (updatedUser) => {
    setUserLogged(updatedUser);
    localStorage.setItem('userLogged', JSON.stringify(updatedUser));
    setIsEditingProfile(false);
  };

  // //function to check if user is looged as ADMIN
  // const toggleAdminStatus = () => {
  //   setIsAdmin(!isAdmin);
  // };

  return (
    <div>
      <h2>Hey System Users</h2>
      {isLoggedIn && userLogged && isAdmin ? ( // Check if the user is logged in and is an admin
        <SystemAdmin user={userLogged} onLogout={handleLogout} />
      ) : (
        // Render login/register components for regular users
        <div>
          {isLoggedIn ? (
            isEditingProfile ? (
              <EditDetails user={userLogged} onLogout={handleLogout} setIsEditingProfile={setIsEditingProfile} onSave={handleSaveChanges} onCancel={handleCancel}/>
            ) : (
              <Profile_new user={userLogged} onLogout={handleLogout} onEdit={setIsEditingProfile} />
            )
          ) : (
            showRegister ? (
              <Register switchToLogin={switchToLogin} />
            ) : (
              <Login setIsLoggedIn={setIsLoggedIn} onLogin={handleLogin} />
            )
          )}
        </div>
      )}
    </div>
  );
}

export default App;
