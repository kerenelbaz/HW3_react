import React, { useState } from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import CakeIcon from '@mui/icons-material/Cake';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';

const cities = ['כפר יונה', 'תל אביב', 'רמת גן', 'נתניה', 'נהריה', 'גבעתיים', 'רעננה', 'הרצליה', 'חולון', 'ראשון לציון', 'חיפה', 'ירושלים', 'בנימינה', 'זכרון יעקב', 'טבריה', 'רמת השרון', 'קריית שמונה', 'קריית גת'];

const EditDetails = ({ user, onSave, onCancel, setIsEditingProfile }) => {
    const [userData, setUserData] = useState(() => {
        const storedUserData = JSON.parse(localStorage.getItem('userLogged'));
        // Check if user data exists in local storage
        if (storedUserData) {
          // If user data exists, add the 'passwordVerify' attribute
          storedUserData.passwordVerify = storedUserData.password;
          return storedUserData;
        } else {
          // If user data doesn't exist, return an empty object
          return {};
        }
      });
  const [editing, setEditing] = useState(false);

  const [openSnackbarSave, setOpenSnackbarSave] = React.useState(false);
  const [openSnackbarErros, setOpenSnackbarErros] = React.useState(false);
  const [openTakenUsernameSnackbar, setOpenTakenUsernameSnackbar] = React.useState(false);


  const handleCloseTakenUsernameSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenTakenUsernameSnackbar(false);
};

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

  const handleSaveChanges = () => {
    // Save the changes made in the form
    // Update user data in localStorage or send it to the server
    // For demonstration, let's just update the state
    localStorage.setItem('userLogged', JSON.stringify(userData));
    setEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleDateChange = (date) => {

    const age = calculateAge(date);

    // Check if age is within the desired range (18 to 120 years)
    const isValidAge = age >= 18 && age <= 120;
    if (!isValidAge) {
      // Mark the date as invalid if it's not a valid JavaScript Date object
      setUserData(prevFormData => ({
        ...prevFormData,

      }));
      return;
    } else {
      setUserData(prevFormData => ({
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

  const handleFileChange = (e) => {
    const file = e.target.files[0].name;

    if (file) {
      // Check if the file extension is .jpg or .jpeg
      const validExtensions = ['jpg', 'jpeg'];
      const fileExtension = file.split('.').pop().toLowerCase();

      if (!validExtensions.includes(fileExtension)) {
        // Set img error to true
        setUserData(prevFormData => ({
          ...prevFormData,
          img: '',

        }));
      } else {
        // Clear img error and set selected file
        setUserData(prevFormData => ({
          ...prevFormData,
          img: file,


        }));
      }
    }

  };

  const validUsername = (username) => {
    const usernameRegex = /^[A-Za-z0-9!@#$%^&*()-+=_]{1,60}$/;
    return usernameRegex.test(username);
  }

  const validPassword = (password) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()-+=])[A-Za-z0-9!@#$%^&*()-+=]{7,12}$/;
    console.log('password in checkking verify is ',password.toString())
    return passwordRegex.test(password);
  }

  const validVerifyPassword = (userData) => {
    console.log('verify is ',userData.passwordVerify)
    console.log('user data is ',userData)
    return userData.password === userData.passwordVerify;
  }

  const validHouseNumber = (houseNumber) => {
    const houseNumberRegex = /^\d+$/;
    return houseNumberRegex.test(houseNumber);
    //return houseNumberRegex.test(houseNumber) && parseInt(houseNumber);
  }

  const handleEditAccount = () => {
    setEditing(true);
  };

  const handleCancel = () => {
    onCancel();
    setIsEditingProfile(false); // Call setIsEditingProfile to update the state
  };
  


  const validBD = (dateOfBirth) => {
    const dob = new Date(dateOfBirth);
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const m = today.getMonth() - dob.getMonth();
    //בדיקה של החודשים - אם לא היה לו עדיין חודש יומולדת נוריד מהגיל (הפרש בין השנים) שנה
    if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
      age--;
    }

    if (age < 18 || age > 120) {
      console.log(false, "under 18 or above 120")
      return false; // התאריך לא הגיוני אם הגיל קטן מ-18 או גדול מ-120
    }
    return true;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("username to send to validate is: " + userData.username);
    console.log("password to send to validate is: " + userData.password);
    const isValidUsername = validUsername(userData.username);
    const isValidPassword = validPassword(userData.password);
    const isValidVerifyPass = validVerifyPassword(userData);
    const isValidFirstname = /^[a-zA-Z ]*$/.test(userData.firstName);
    const isValidLastname = /^[a-zA-Z ]*$/.test(userData.lastName);
    const isValidStreet = /^[א-ת\s]*$/.test(userData.streetName);
    const isValidHoseNumber = validHouseNumber(userData.houseNumber);
    const isValidBDate = validBD(userData.date);



    if (
      userData.username === '' ||
      userData.password === '' ||
      userData.passwordVerify === '' ||
      userData.firstName === '' ||
      userData.lastName === '' ||
      userData.streetName === '' ||
      userData.houseNumber === ''
    ) {
      return;
    }

    if (isValidUsername && isValidPassword && isValidVerifyPass && isValidFirstname && isValidLastname && isValidStreet && isValidHoseNumber && isValidBDate) {
        
      console.log('Form is valid, changed details');

      const users = JSON.parse(localStorage.getItem('users'));
      const userLoggedin = JSON.parse(localStorage.getItem('userLogged')).username;
      const usernameToUpdate = userLoggedin;
      const userToUpdateIndex = users.findIndex(user => user.username === usernameToUpdate);

      const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
      const isUsernameTaken = storedUsers.some(user => user.username === userData.username);

      //const userToUpdateIndex = users.findIndex(user => user.username === usernameToUpdate);

      if (isUsernameTaken && users[userToUpdateIndex].username === userData.username || !isUsernameTaken && users[userToUpdateIndex].username === userData.username) {

        //change the user from the local storage

        // Step 1: Retrieve the array of users from local storage
        //const users = JSON.parse(localStorage.getItem('users'));
        //const userLoggedin = JSON.parse(localStorage.getItem('userLogged')).username;
        
        // Step 2: Find the specific user whose details you want to change
        //const usernameToUpdate = userLoggedin;
        //const userToUpdateIndex = users.findIndex(user => user.username === usernameToUpdate);
        // Step 3: Update the details of that user
        users[userToUpdateIndex].username = userData.username;
          users[userToUpdateIndex].password = userData.password;
          users[userToUpdateIndex].firstName = userData.firstName;
          users[userToUpdateIndex].lastName = userData.lastName;
          users[userToUpdateIndex].city = userData.city;
          users[userToUpdateIndex].houseNumber = userData.houseNumber;
          users[userToUpdateIndex].streetName = userData.streetName;
          users[userToUpdateIndex].img = userData.img;
          users[userToUpdateIndex].birthDate = userData.birthDate;
          console.log("The user updated is: " + users[userToUpdateIndex])
          const userUpdated = users[userToUpdateIndex]

          // Step 4: Save the updated array of users back to local storage
          localStorage.setItem('users', JSON.stringify(users));
          setOpenSnackbarSave(true);

          localStorage.setItem('userLogged', JSON.stringify(userUpdated));

          setTimeout(() => {
            setEditing(false);
            setIsEditingProfile(false);
            setUserData(userUpdated);
          }, 7000);
        
        
      } else {
        console.log('Username is already used by another user');
        setOpenTakenUsernameSnackbar(true);
        return;
      }

    }
    else {
      console.log('Form is invalid, please try again');
      console.log('isValidUsername :' + isValidUsername);
      console.log('isValidPassword :' + isValidPassword);
      console.log('isValidVerifyPass :' + isValidVerifyPass);
      console.log('isValidFirstname :' + isValidFirstname);
      console.log('isValidLastname :' + isValidLastname);
      console.log('isValidStreet :' + isValidStreet);
      console.log('isValidHoseNumber :' + isValidHoseNumber);
      console.log('isValidBDate :' + isValidBDate);


      setOpenSnackbarErros(true);
    }



  }



  const handleCityChange = (e, newCity) => {
    setUserData(prevData => ({
      ...prevData, ['city']: newCity
    }));
  }

  //let loggedUser = JSON.parse(localStorage.getItem('userLogged'));

  return (
    <Card sx={{ width: 420, maxWidth: '100%', boxShadow: 'lg' }}>
      <CardContent>
            <form id='myForm' onSubmit={handleSubmit}>


              <TextField
                label="Username"
                name="username"
                onChange={handleChange}
                fullWidth
                margin="normal"
                value={userData.username}
              />
              <div style={{ display: 'flex', gap: '10px' }}>
                <TextField
                  label="First Name"
                  name="firstName"
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                  value={userData.firstName}
                />

                <TextField
                  label="Last Name"
                  name="lastName"
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                  value={userData.lastName}
                />
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <TextField
                  label={'Password'}
                  id="password"
                  name="password"
                  // type={'password'}
                  onChange={handleChange}
                  required
                  autoFocus
                  margin="normal"
                  style={{ width: '49%' }}
                  value={userData.password}
                />
                <TextField
                  label={'Verify Password'}
                  id="passwordVerify"
                  name="passwordVerify"
                  // type="password"
                  onChange={handleChange}
                  required
                  margin='normal'
                  style={{ width: '49%' }}
                  value={userData.passwordVerify}
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
                        value={dayjs(userData.birthDate) }
                      />

                    </div>
                  </DemoContainer>
                </Box>
              </LocalizationProvider>

              <input
                type="file"
                id="img"
                name="img"
                accept='.jpg, .jpeg'
                onChange={handleFileChange}
                required
                
                style={{ paddingTop: '20px', paddingBottom: '10px', fontSize: '16px' }}
              />


              <Autocomplete
                options={cities}
                getOptionLabel={(option) => (option)}
                value={userData.city}
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
                  onChange={handleChange}
                  value={userData.streetName}
                  required
                  margin='normal'
                />

                <TextField
                  label={'House Number'}
                  id="houseNumber"
                  name="houseNumber"
                  type="number"
                  value={userData.houseNumber}
                  onChange={handleChange}
                  required
                  margin='normal'
                />
              </div>

              <div style={{ display: 'flex', gap: '114px' }}>
                <Button type='submit'>Save Changes</Button>
                <Button onClick={handleCancel}>Cancel</Button>
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

            </form>

          </CardContent>
    </Card>
  );
};

EditDetails.propTypes = {
  user: PropTypes.object.isRequired,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default EditDetails;
