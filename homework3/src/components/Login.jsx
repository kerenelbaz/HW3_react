/* eslint-disable react/prop-types */
import { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import TaskAlt from '@mui/icons-material/TaskAlt';
import ArrowBack from '@mui/icons-material/ArrowBack';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

const styles = {
    fieldContainer: {
        marginBottom: '10px',
        borderRadius: '20px',
        justifyContent: 'center',
        alignItems: 'center'

    },
    fieldInput: {
        width: '100%',
        marginBottom: '10px',
        borderRadius: '20px'
    },
};
// setIsLoggedIn and onLogin passed from the father
export default function Login({ setIsLoggedIn, onLogin ,onRegisterClick}) {

    Login.propTypes = {
        setIsLoggedIn: PropTypes.func.isRequired,
        onLogin: PropTypes.func.isRequired,
    };

    const [formData, setFormData] = useState({ //useState hook
        username: '',
        password: ''
    });
    const [loginFailed, setLoginFailed] = useState(false); //useState hook

    const handleChange = (e) => {

        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    

    // function loginUser - retrieve the username and password from the form data state
    const handleSubmit = (e) => {
        e.preventDefault(); // prevent default form submission
        const { username, password } = formData;

        const storedUsers = JSON.parse(localStorage.getItem('users')) || []; //retrieves the stored users from the local storage.

        if (storedUsers.length > 0) {//checks if there are users in the local storage
            //search for a user with a matching username and password
            const foundUser = storedUsers.find(user => user.username === username && user.password === password);

            if (foundUser) {
                onLogin(foundUser); // Pass the logged-in user data to the parent component by calling the onLogin function provided as a prop
                setIsLoggedIn(true);

            }
            else if (username == 'admin' && password == 'ad12343211ad') {
                setIsLoggedIn(true);
                formData.username = 'admin';
                formData.password = 'ad12343211ad';
                sessionStorage.setItem('userLogged', JSON.stringify(formData));
                setIsLoggedIn(true);
            }
            else { //no user was found match to the username of password
                setLoginFailed(true); // prompt the alert for login faild
            }
        } else {// no users stored in the local storage
            console.log('No users registered');
            setLoginFailed(true); // prompt the alert for login faild
        }

        
    }


    return ( //renders a form with input fields for the username and password.
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
                        type='password'
                        onChange={handleChange}
                        required
                        autoFocus
                        style={styles.fieldInput}
                    />

                    <Button type='submit' variant="contained" endIcon={<TaskAlt />}>
                        Send
                    </Button>
                    <br />
                    <br />
                    <Button type='button' variant="text" startIcon={<ArrowBack />} onClick={onRegisterClick}>
                        Go Back
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

