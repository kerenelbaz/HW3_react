
import { useState } from 'react';

import Button from '@mui/material/Button';
import TaskAlt from '@mui/icons-material/TaskAlt';
import TextField from '@mui/material/TextField';

import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

const styles = {
    fieldContainer: {
      marginBottom: '10px',
      borderRadius: '20px'
      
    },
    fieldInput: {
      width: '100%',
      marginBottom: '10px',
      borderRadius: '20px'
    },
  };

export default function Login() {
  
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [loginFailed, setLoginFailed] = useState(false);

    // eslint-disable-next-line no-unused-vars
    const [showPass, setShowPass] = useState(false);
    
    const handleChange = (e) => {

        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    }
    

    const handleSubmit = (e) => {

        e.preventDefault();
        const {username, password} = formData;

        const storedUsers = JSON.parse(localStorage.getItem('users'))||[];

        if(storedUsers.length>0){
            const foundUser = storedUsers.find(user => user.username === username && user.password === password);

            if (foundUser) {
                localStorage.setItem('userLogged', JSON.stringify(foundUser));
                console.log('Login successful:', foundUser);
              
            } else {
                console.log('Incorrect username or password');
                setLoginFailed(true);
            }
        } else {
            // No users stored in the local storage
            console.log('No users registered');
            setLoginFailed(true);
        }

    }


    return (
      <div><h2>Sign In</h2>
        <form onSubmit={handleSubmit}>
        <div style={styles.fieldContainer}>
            <TextField 
                label={'Username'} 
                id="username"
                name="username" 
                onChange={handleChange} 
                required
                autoFocus
                style={styles.fieldInput}             
            />
            
            </div>  

            <div style={styles.fieldContainer}>
            <TextField 
                label={'Password'} 
                id="password"
                name="password" 
                type={showPass ? 'text' : 'password'} 
                onChange={handleChange} 
                required
                autoFocus
                style={styles.fieldInput}              
            />

            <Button type='submit' variant="contained" endIcon={<TaskAlt />}>
                Send
            </Button>
            </div>  
        </form>
            {loginFailed && (
                <Alert severity="error">
                    <AlertTitle>Error</AlertTitle>
                    Incorrect username or password.
                </Alert>
            )}

      </div>
    )
  }

