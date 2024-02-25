/* eslint-disable react/prop-types */
import { useState } from 'react';
import React from 'react';

import Button from '@mui/material/Button';
import TaskAlt from '@mui/icons-material/TaskAlt';
import TextField from '@mui/material/TextField';

import CakeIcon from '@mui/icons-material/Cake';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';


import Tooltip from '@mui/material/Tooltip';

import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

// Define styles
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

const dateInputStyle = {
    width: '100%',
    marginBottom: '10px',

};




export default function Register({ switchToLogin }) {
    const initialErrors = {
        username: false,
        password: false,
        passwordVerify: false,
        img: false,
        firstName: false,
        lastName: false,
        email: false,
        birthDate: false,
        city: false,
        streetName: false,
        houseNumber: false
    };

    const [formData, setFormData] = useState({
        username: '',
        password: '',
        passwordVerify: '',
        img: '',
        firstName: '',
        lastName: '',
        email: '',
        birthDate: '',
        city: '',
        streetName: '',
        houseNumber: '',
        errors: {
            username: false,
            password: false,
            passwordVerify: false,
            img: false,
            firstName: false,
            lastName: false,
            email: false,
            birthDate: false,
            city: false,
            streetName: false,
            houseNumber: false
        }
    });



    const cities = ['כפר יונה', 'תל אביב', 'רמת גן', 'נתניה', 'נהריה', 'גבעתיים', 'רעננה', 'הרצליה', 'חולון', 'ראשון לציון', 'חיפה', 'ירושלים', 'בנימינה', 'זכרון יעקב', 'טבריה', 'רמת השרון', 'קריית שמונה', 'קריית גת'];

    // for input change
    const handleChange = (e) => {

        const { name, value } = e.target;

        let isValid = true;

        switch (name) {
            case 'username':
                isValid = /^[A-Za-z0-9!@#$%^&*()-+=_]{1,60}$/.test(value);
                break;

            case 'password':
                isValid = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()-+=])[A-Za-z0-9!@#$%^&*()-+=]{7,12}$/.test(value);
                break;

            case 'passwordVerify':
                isValid = value === formData.password;
                break;

            case 'firstName':
                isValid = /^[A-Za-z]+$/.test(value);
                break;
            case 'lastName':
                isValid = /^[A-Za-z]+$/.test(value);
                break;

            case 'email':
                isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
                break;

            case 'birthDate':
                isValid = !isNaN(Date.parse(value));
                break;
            case 'city':
                isValid = cities.includes(value);
                break;
            case 'streetName':
                isValid = /^[\u05D0-\u05EA]+$/.test(value);
                break;
            case 'houseNumber':
                isValid = /^\d+$/.test(value) && parseInt(value) > 0;
                break;

            default:
                break;
        }

        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
            errors: {
                ...prevFormData.errors,
                [name]: !isValid,
            },
        }));


    }



    //for singing up - good form
    const [openSnackbar, setOpenSnackbar] = React.useState(false);
    const [openTakenUsernameSnackbar, setOpenTakenUsernameSnackbar] = React.useState(false);

    // for form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
        const isUsernameTaken = storedUsers.some(user => user.username === formData.username);
        if (isUsernameTaken) {
            setOpenTakenUsernameSnackbar(true);
            return;
        }

        console.log("user is " + JSON.stringify(formData));


        // Check if any required fields are empty
        if (
            formData.username === '' ||
            formData.password === '' ||
            formData.passwordVerify === '' ||
            formData.firstName === '' ||
            formData.lastName === '' ||
            formData.email === '' ||
            formData.birthDate === '' ||
            formData.city === '' ||
            formData.streetName === '' ||
            formData.houseNumber === ''
        ) {
            return;
        }

        const newUser = {
            username: formData.username,
            password: formData.password,
            img: formData.img,
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            birthDate: formData.birthDate,
            city: formData.city,
            streetName: formData.streetName,
            houseNumber: formData.houseNumber
        };

        // Get existing users data from local storage or initialize an empty array
        const existingUsersData = JSON.parse(localStorage.getItem('users')) || [];

        // Add the new user to the existing users data array
        const updatedUsersData = [...existingUsersData, newUser];

        // Save the updated users data array to local storage
        localStorage.setItem('users', JSON.stringify(updatedUsersData));

        //assuming the form is valid since im checking it during the fields
        //props.registerUser(JSON.stringify(formData));

        // Clear the form data
        setFormData({
            username: '',
            password: '',
            passwordVerify: '',
            img: '',
            firstName: '',
            lastName: '',
            email: '',
            birthDate: '',
            city: '',
            streetName: '',
            houseNumber: '',
            errors: { ...initialErrors } // Reset errors
        });
        document.getElementById('myForm').reset();



        setOpenSnackbar(true);
    };

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenSnackbar(false);
    };

    const handleCloseTakenUsernameSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenTakenUsernameSnackbar(false);
    };


    // for file change
    const handleFileChange = (e) => {
        const file = e.target.files[0].name;

        if (file) {
            // Check if the file extension is .jpg or .jpeg
            const validExtensions = ['jpg', 'jpeg'];
            const fileExtension = file.split('.').pop().toLowerCase();

            if (!validExtensions.includes(fileExtension)) {
                // Set img error to true
                setFormData(prevFormData => ({
                    ...prevFormData,
                    img: '',
                    errors: {
                        ...prevFormData.errors,
                        img: true
                    }
                }));
            } else {
                // Clear img error and set selected file
                setFormData(prevFormData => ({
                    ...prevFormData,
                    img: file,

                    errors: {
                        ...prevFormData.errors,
                        img: false
                    }
                }));
            }
        }

    };

    // Handle date change
    const handleDateChange = (date) => {

        const age = calculateAge(date);

        // Check if age is within the desired range (18 to 120 years)
        const isValidAge = age >= 18 && age <= 120;
        if (!isValidAge) {
            // Mark the date as invalid if it's not a valid JavaScript Date object
            setFormData(prevFormData => ({
                ...prevFormData,
                errors: {
                    ...prevFormData.errors,
                    birthDate: true,
                },
            }));
            return;
        } else {
            setFormData(prevFormData => ({
                ...prevFormData,
                birthDate: date,
                errors: {
                    ...prevFormData.errors,
                    birthDate: false
                },
            }));
        }

    };

    // Calculate age based on birth date
    const calculateAge = (birthDate) => {
        const today = new Date();
        const dob = new Date(birthDate);
        let age = today.getFullYear() - dob.getFullYear();
        const monthDiff = today.getMonth() - dob.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
            age--;
        }
        return age;
    };


    // const validForm = () =>{
    //     //checking username validation
    //     const usernameRegex = /^[A-Za-z0-9!@#$%^&*()-+=_]{1,60}$/;
    //     if (!formData.username.match(usernameRegex)) return false;

    //     // checking passwords validation
    //     const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()-+=])[A-Za-z0-9!@#$%^&*()-+=]{7,12}$/;
    //     if(!formData.password.match(passwordRegex)) return false;

    //     // checking password confirmation
    //     if(formData.password !== formData.passwordVerify) return false;

    //     // checking picture format
    //     const isGoodPicture = ['jpg', 'ipeg'];
    //     const fileExtenstion = formData.img.split('.').pop().toLowerCase();
    //     if(!isGoodPicture.includes(fileExtenstion)) return false;

    //     //checking firstName validation
    //     if(typeof formData.firstName !== 'string') return false;
    //     //checking lastName validation
    //     if(typeof formData.lastName !== 'string') return false;

    //     //checking email validation
    //     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    //     if (!formData.email.match(emailRegex)) return false; 

    //     //checking birthDate validation
    //     // const age = new Date().getFullYear()-formData.birthDate.getFullYear();
    //     // if(!(age>18&&age<=120)) return false;

    //     //checking city validation
    //     const cities =['תל אביב','רמת גן','נתניה','נהריה','גבעתיים','רעננה','הרצליה','חולון','ראשון לציון','חיפה','ירושלים','בנימינה','זכרון יעקב','טבריה','רמת השרון','קריית שמונה','קריית גת'];
    //     if(!cities.includes(formData.city)) return false;

    //     //checking street name validation
    //     if(typeof formData.streetName !== 'string') return false;

    //     //checking street number validation
    //     if(isNaN(formData.houseNumber) || formData.houseNumber <= 0) return false;

    //     return true;

    // };

    const handleCityChange = (e, newCity) => {
        setFormData(prevData => ({
            ...prevData, ['city']: newCity
        }));
    }

    //checkbox for not showing the password text
    // eslint-disable-next-line no-unused-vars
    const [showPass, setShowPass] = React.useState(false);

    const preventDefault = (event) => event.preventDefault();


    return (
        <div >
            <h3>Register</h3>
            <form id='myForm' onSubmit={handleSubmit} style={{ maxWidth: '400px' }}>

                <div style={styles.fieldContainer}>
                    <TextField
                        label={'Username'}
                        id="username"
                        name="username"
                        onChange={handleChange}
                        required
                        autoFocus
                        error={formData.errors.username}
                        helperText={formData.errors.username && 'השתמש באותיות לועזיות, מספרים ותווים מיוחדים'}
                        style={styles.fieldInput}
                    />

                </div>

                <div style={{ ...styles.fieldContainer, display: 'flex', justifyContent: 'space-between' }}>
                    <div style={{ width: '48%' }}>
                        <TextField
                            label={'First Name'}
                            id="firstName"
                            name="firstName"
                            onChange={handleChange}
                            required
                            error={formData.errors.firstName}
                            helperText={formData.errors.firstName && 'only strings allowed'}
                            style={styles.fieldInput}
                        />
                    </div>

                    <div style={{ width: '48%' }}>
                        <TextField
                            label={'Last Name'}
                            id="lastName"
                            name="lastName"
                            onChange={handleChange}
                            required
                            error={formData.errors.lastName}
                            helperText={formData.errors.lastName && 'only strings allowed'}
                            style={styles.fieldInput}
                        />
                    </div>

                </div>

                <div style={styles.fieldContainer}>
                    <Tooltip
                        title={formData.errors.password && 'סיסמא מכילה 7-12 תווים, אות גדולה, מספר ותו מיוחד'}
                        open={formData.errors.password}
                        arrow
                        placement="right"
                        enterDelay={500}
                        leaveDelay={200}

                    >
                        <TextField
                            label={'Password'}
                            id="password"
                            name="password"
                            type={showPass ? 'text' : 'password'}
                            onChange={handleChange}
                            required
                            autoFocus
                            error={formData.errors.password}
                            helperText={formData.errors.password && 'invalid password'}
                            style={styles.fieldInput}
                        />
                    </Tooltip>


                </div>

                <div style={styles.fieldContainer}>

                    <TextField
                        label={'Verify Password'}
                        id="passwordVerify"
                        name="passwordVerify"
                        type="password"
                        onChange={handleChange}
                        required
                        error={formData.errors.passwordVerify}
                        helperText={formData.errors.passwordVerify && 'הסיסמאות לא תואמות'}
                        style={styles.fieldInput}
                    />
                </div>


                <div style={styles.fieldContainer}>
                    <Tooltip
                        title={formData.errors.email && 'email should be in english letters, special characters and @ will only appears once. the email should ends with .com'}

                        open={formData.errors.email}
                        arrow
                        placement="right"
                        enterDelay={500}
                        leaveDelay={200}

                    >
                        <TextField
                            label={'Email'}
                            id="email"
                            name="email"
                            type="email"
                            onChange={handleChange}
                            required
                            error={formData.errors.email}
                            helperText={formData.errors.email && 'email should be sometext@sometext.com'}
                            style={styles.fieldInput}
                        />
                    </Tooltip>
                </div>

                <div style={styles.fieldContainer}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <Box >
                            <DemoContainer components={['DatePicker']} valueType="date">
                                <div style={dateInputStyle}>
                                    <DatePicker label="Birth Day"
                                        slots={{ openPickerIcon: CakeIcon }}
                                        id="birthDay"
                                        name="birthDay"
                                        onChange={handleDateChange}
                                        slotProps={{
                                            textField: {
                                                error: formData.errors.birthDate,
                                                helperText: formData.errors.birthDate && 'Invalid birth date',
                                            },
                                        }}
                                    />

                                </div>
                            </DemoContainer>
                        </Box>
                    </LocalizationProvider>
                </div>

                <div style={styles.fieldContainer}>
                    <TextField
                        type="file"
                        id="img"
                        name="img"
                        accept='.jpg, .jpeg'
                        onChange={handleFileChange}
                        required
                        style={styles.fieldInput}
                        error={formData.errors.img}
                        helperText={formData.errors.img && 'only jpeg or jpg images'}

                    />

                </div>



                <div style={styles.fieldContainer}>
                    <Autocomplete
                        options={cities}
                        getOptionLabel={(option) => (option)}
                        onChange={handleCityChange}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                required
                                label="City"
                                name="city"
                                autoComplete='city'
                                style={styles.fieldInput}
                            />
                        )}

                    />
                </div>

                <div style={{ ...styles.fieldContainer, display: 'flex', justifyContent: 'space-between' }}>
                    <div style={{ width: '48%' }}>
                        <TextField
                            label={'Street Name'}
                            id="streetName"
                            name="streetName"
                            onChange={handleChange}
                            required
                            error={formData.errors.streetName}
                            helperText={formData.errors.streetName && 'only Hebrew letters are allowed'}
                            style={styles.fieldInput}
                        />
                    </div>

                    <div style={{ width: '48%' }}>
                        <TextField
                            label={'House Number'}
                            id="houseNumber"
                            name="houseNumber"
                            type="number"
                            onChange={handleChange}
                            required
                            error={formData.errors.houseNumber}
                            helperText={formData.errors.houseNumber && 'only positive numbers allowed'}
                            style={styles.fieldInput}
                        />
                    </div>

                </div>


                <Box
                    sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        marginBottom: '10px',
                        justifyContent: 'center',
                        typography: 'body1',
                        '& > :not(style) ~ :not(style)': {
                            ml: 2,
                        },
                    }}
                    onClick={preventDefault}
                >
                    <Link href="#" underline="hover" onClick={switchToLogin}>
                        {'Already have an account? Click to sign in'}
                    </Link>


                </Box>


                <Button type='submit' variant="contained" endIcon={<TaskAlt />}>
                    Send
                </Button>
                <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                    <Alert
                        onClose={handleCloseSnackbar}
                        severity="success"
                        sx={{ width: '100%' }}
                    >
                        Account Created, Thank You
                    </Alert>
                </Snackbar>

                <Snackbar open={openTakenUsernameSnackbar} autoHideDuration={6000} onClose={handleCloseTakenUsernameSnackbar} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                    <Alert
                        onClose={handleCloseTakenUsernameSnackbar}
                        severity="info"

                        sx={{ width: '100%' }}
                    >
                        Username is already exsit
                    </Alert>
                </Snackbar>
            </form>
        </div>
    );



}