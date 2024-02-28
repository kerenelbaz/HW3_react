import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import CakeIcon from '@mui/icons-material/Cake';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import dayjs from 'dayjs';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';

const cities = ['כפר יונה', 'תל אביב', 'רמת גן', 'נתניה', 'נהריה', 'גבעתיים', 'רעננה', 'הרצליה', 'חולון', 'ראשון לציון', 'חיפה', 'ירושלים', 'בנימינה', 'זכרון יעקב', 'טבריה', 'רמת השרון', 'קריית שמונה', 'קריית גת'];

export default function AdminEditUserInfo({ user, onSave, onCancel }) {
    const [editedUser, setEditedUser] = useState({ ...user });
    // snackbar state to control the visibility of snackbar alerts:
    const [openSnackbarSave, setOpenSnackbarSave] = React.useState(false);
    const [openSnackbarErros, setOpenSnackbarErros] = React.useState(false);
    const [openTakenUsernameSnackbar, setOpenTakenUsernameSnackbar] = React.useState(false);
    const [isValidBirthDate, setIsValidBirthDate] = React.useState(true); // State variable to track the validity of the date input
    const [isSnackbarDateOpen, setIsSnackbarDateOpen] = useState(false); // State variable to control the visibility of the snackbar



    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };

    const handleCloseSnackbarDateOpen = (event,reason)=>{
        if (reason === 'clickaway') {
            return;
        }
        setIsSnackbarDateOpen(false)
    }

    //responsible for handling the closing of the snackbar alert about edit unavailable username
    const handleCloseTakenUsernameSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenTakenUsernameSnackbar(false);
    };

    // responsible for handling the closing of the snackbar alert about errors in editting
    const handleCloseSnackbarError = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbarErros(false);
    }

    const handleCloseSnackbarSave = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenSnackbarSave(false);
    };

    //Function to handle the image uploading
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        const fileName = file ? file.name : ''; // Handle case when file is empty

        if (file) {
            // Check if the file extension is .jpg or .jpeg
            const validExtensions = ['jpg', 'jpeg'];
            const fileExtension = fileName.split('.').pop().toLowerCase();

            if (!validExtensions.includes(fileExtension)) {
                setEditedUser(prevFormData => ({
                    ...prevFormData,
                    img: '',
                }));
            } else {
                const reader = new FileReader();

                reader.onload = () => {
                    setEditedUser(prevFormData => ({
                        ...prevFormData,
                        img: reader.result,
                    }));
                };
                reader.readAsDataURL(file);
            }
        } else {
            // If file is empty, maintain the previous value of img
            console.log('No file uploaded, maintaining previous image');
        }
    };

    //Function to help with validation of the form fields - returns bolean value
    const validUsername = (username) => {
        const usernameRegex = /^[A-Za-z0-9!@#$%^&*()-+=_]{1,60}$/;
        return usernameRegex.test(username);
    }

    const validHouseNumber = (houseNumber) => {
        const houseNumberRegex = /^\d+$/;
        return houseNumberRegex.test(houseNumber);
        //return houseNumberRegex.test(houseNumber) && parseInt(houseNumber);
    }

    const validBD = (dateOfBirth) => {
        const dob = new Date(dateOfBirth);
        const today = new Date();
        let age = today.getFullYear() - dob.getFullYear();
        const m = today.getMonth() - dob.getMonth();

        if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
            age--;
        }
        console.log("age: " + age)

        if (age < 18 || age > 120) {
            console.log(false, "age must be under 18 or above 120")
            setIsValidBirthDate(false);
            return false;
        }
        setIsValidBirthDate(true)
        return true;
    }

    //Function to handle the date change event
    const handleDateChange = (date) => {

        const age = calculateAge(date);

        // Check if age is within the desired range (18 to 120 years)
        const isValidAge = age >= 18 && age <= 120;
        setIsValidBirthDate(isValidAge);
        if (!isValidAge) {
            setIsSnackbarDateOpen(true);
            setIsValidBirthDate(false);
        
            return;
        } else {
            setIsValidBirthDate(true)
            setEditedUser(prevFormData => ({
                ...prevFormData,
                birthDate: date,

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

    const handleSubmit = (e) => {
        e.preventDefault();

        const isValidUsername = validUsername(editedUser.username);
        const isValidFirstname = /^[a-zA-Z ]*$/.test(editedUser.firstName);
        const isValidLastname = /^[a-zA-Z ]*$/.test(editedUser.lastName);
        const isValidStreet = /^[א-ת\s]*$/.test(editedUser.streetName);
        const isValidHoseNumber = validHouseNumber(editedUser.houseNumber);
        const isValidBDate = validBD(editedUser.birthDate);

        if ( //checks if the fields are not empty
            editedUser.username === '' ||
            editedUser.firstName === '' ||
            editedUser.lastName === '' ||
            editedUser.streetName === '' ||
            editedUser.houseNumber === ''
        ) {
            return;
        }

        // check if birth date is valid
        if (!isValidBirthDate) {
            setIsSnackbarDateOpen(true);
            return; // prevent saving if birth date is invalid
        }

        if (isValidUsername && isValidFirstname && isValidLastname && isValidStreet && isValidHoseNumber && isValidBDate) {
            //finding the index of the user we want to change his details by the username
            const users = JSON.parse(localStorage.getItem('users')) || [];
            const usernameToUpdate = user.username;
            const userToUpdateIndex = users.findIndex(user => {
                return user.username === usernameToUpdate;
            });

            const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
            const isUsernameTakenByAnotherUser = storedUsers.some(user => user.username === editedUser.username);

            if (userToUpdateIndex != -1) {

                if (!isUsernameTakenByAnotherUser || users[userToUpdateIndex].username === editedUser.username) {
                    users[userToUpdateIndex].username = editedUser.username;
                    users[userToUpdateIndex].firstName = editedUser.firstName;
                    users[userToUpdateIndex].lastName = editedUser.lastName;
                    users[userToUpdateIndex].city = editedUser.city;
                    users[userToUpdateIndex].houseNumber = editedUser.houseNumber;
                    users[userToUpdateIndex].streetName = editedUser.streetName;
                    users[userToUpdateIndex].img = editedUser.img;
                    users[userToUpdateIndex].birthDate = editedUser.birthDate;

                    localStorage.setItem('users', JSON.stringify(users));
                    setOpenSnackbarSave(true);

                    setTimeout(() => {
                        setOpenSnackbarSave(false);
                        onSave(editedUser); // pass the edited user data to the onSave function provided by the parent component
                    }, 3000);
                    setTimeout(() => {
                        window.location.reload();
                    }, 3000);

                } else {
                    console.log('Username is already used by another user');
                    setOpenTakenUsernameSnackbar(true);
                }
            }
        } 
        else {
            console.log('Form is invalid, please try again');
            setOpenSnackbarErros(true);
        }
    };

    //Function to handle the city list change
    const handleCityChange = (e, newCity) => {
        setEditedUser(prevData => ({
            ...prevData, ['city']: newCity
        }));
    }


    return (
        <Card sx={{ width: 420, maxWidth: '100%', boxShadow: 'lg' }}>
            <CardContent>
                <form id='myForm' onSubmit={handleSubmit}>


                    <TextField
                        label="Username"
                        name="username"
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                        value={editedUser.username}
                    />
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <TextField
                            label="First Name"
                            name="firstName"
                            onChange={handleInputChange}
                            fullWidth
                            margin="normal"
                            value={editedUser.firstName}
                        />

                        <TextField
                            label="Last Name"
                            name="lastName"
                            onChange={handleInputChange}
                            fullWidth
                            margin="normal"
                            value={editedUser.lastName}
                        />
                    </div>

                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <Box style={{ margin: 'noraml' }}>
                            <DemoContainer components={['DatePicker']} valueType="date" margin='noraml'>
                                <div style={{ margin: 'noraml' }}>
                                    <DatePicker label="Birth Day"
                                        slots={{ openPickerIcon: CakeIcon }}
                                        id="birthDay"
                                        name="birthDay"
                                        onChange={handleDateChange}
                                        margin="normal"
                                        value={dayjs(editedUser.birthDate)}

                                    />


                                </div>
                            </DemoContainer>
                        </Box>
                    </LocalizationProvider>

                    <input
                        type="file"
                        id="img"
                        name="img"
                        accept=".jpg, .jpeg"
                        onChange={handleFileChange}


                        style={{ paddingTop: '20px', paddingBottom: '10px', fontSize: '16px' }}
                    />


                    <Autocomplete
                        options={cities}
                        getOptionLabel={(option) => (option)}
                        value={editedUser.city}
                        onChange={handleCityChange}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                required
                                label="City"
                                name="city"
                                autoComplete='city'
                                margin="normal"

                            />
                        )}

                    />

                    <div style={{ display: 'flex', gap: '10px' }}>


                        <TextField
                            label={'Street Name'}
                            id="streetName"
                            name="streetName"
                            onChange={handleInputChange}
                            value={editedUser.streetName}
                            required
                            margin='normal'
                        />

                        <TextField
                            label={'House Number'}
                            id="houseNumber"
                            name="houseNumber"
                            type="number"
                            value={editedUser.houseNumber}
                            onChange={handleInputChange}
                            required
                            margin='normal'
                        />
                    </div>

                    <div style={{ display: 'flex', gap: '114px' }}>
                        <Button type='submit' variant="contained">

                            Save Changes
                        </Button>
                        <Button variant="outlined" onClick={onCancel}>
                            Cancel
                        </Button>
                    </div>

                    <Snackbar open={openSnackbarSave} autoHideDuration={6000} onClose={handleCloseSnackbarSave} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                        <Alert
                            onClose={handleCloseSnackbarSave}
                            severity="success"
                            sx={{ width: '100%' }}
                        >
                            User Details Saved, Thank You!
                        </Alert>
                    </Snackbar>


                    <Snackbar open={openSnackbarErros} autoHideDuration={6000} onClose={handleCloseSnackbarError} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                        <Alert
                            onClose={handleCloseSnackbarError}
                            severity="error"
                            sx={{ width: '100%' }}
                        >
                            Invlid form, please try again
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

                    <Snackbar open={isSnackbarDateOpen} autoHideDuration={3000} onClose={handleCloseSnackbarDateOpen} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                        <Alert onClose={handleCloseSnackbarDateOpen} severity="error">
                            Invalid date. Age should be above 18 and under 120.
                        </Alert>
                    </Snackbar>

                </form>

            </CardContent>
        </Card>



    );
}

AdminEditUserInfo.propTypes = {
    user: PropTypes.object.isRequired,
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
};
