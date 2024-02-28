import { useState, useEffect } from 'react';
import Register from './components/Register';
import Login from './components/Login';
import EditDetails from './components/EditDetails';
import Profile from './components/Profile';
import SystemAdmin from './components/SystemAdmin';


function App() {
  // State variables to manage user data, authentication status, and editing profile status
  const [showRegister, setShowRegister] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // flag state variable to know if there is user that logged in or not
  const [userLogged, setUserLogged] = useState(JSON.parse(sessionStorage.getItem('userLogged'))); //state variable to get the user who is logged in
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const userLoggedString = sessionStorage.getItem('userLogged');
    if (userLoggedString) {
      try {
        const userLogged = JSON.parse(userLoggedString);
        setUserLogged(userLogged);
        setIsLoggedIn(true);
        if (userLogged.username === 'admin')
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
    setShowRegister(false); // Set showRegister to false to switch back to the login form
  };

  //function that gets triggered when the user successfully logs in. and save the active user to the local storage
  const handleLogin = (user) => {
    setUserLogged(user);
    sessionStorage.setItem('userLogged', JSON.stringify(user));
    setIsLoggedIn(true);
    if (user.username === 'admin')
      setIsAdmin(true);
  };

  const handleLogout = () => {
    setUserLogged(null);
    sessionStorage.removeItem('userLogged');
    setIsLoggedIn(false);
    setIsAdmin(false)
  };

  const handleRegisterClick = () => {
    setShowRegister(true); // Set showRegister to true to display the registration form
};

  const handleCancel = () => {
    setIsEditingProfile(false);
  };

  const handleSaveChanges = (updatedUser) => {
    setUserLogged(updatedUser);
    sessionStorage.setItem('userLogged', JSON.stringify(updatedUser));
    setIsEditingProfile(false);
  };

  return (
    <div>

      {isLoggedIn && userLogged && isAdmin ? ( // Check if the user is logged in and is an admin
        <SystemAdmin user={userLogged} onLogout={handleLogout} />
      ) : (
        <div>
          {isLoggedIn ? (
            isEditingProfile ? (
              <EditDetails user={userLogged} onLogout={handleLogout} setIsEditingProfile={setIsEditingProfile} onSave={handleSaveChanges} onCancel={handleCancel} />
            ) : (
              <Profile user={userLogged} onLogout={handleLogout} onEdit={setIsEditingProfile} />
            )
          ) : (
            showRegister ? (
              <Register switchToLogin={switchToLogin} />
            ) : (
              <Login setIsLoggedIn={setIsLoggedIn} onLogin={handleLogin} onRegisterClick={handleRegisterClick}/>
            )
          )}
        </div>
      )}
    </div>
  );
}

export default App;
