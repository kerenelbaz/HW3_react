import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import dayjs from 'dayjs'
import Avatar from '@mui/material/Avatar';


export default function SystemAdmin(props) {
    const [users, setUsers] = useState([]);


    useEffect(() => {
        // gets the users from the local storage
        const userData = localStorage.getItem('users');
        if (userData) { //make sure the users is exist
            const parsedUsers = JSON.parse(userData);
            setUsers(parsedUsers); //update the use state of users
        }
    }, []);

    // function for delete users from the table 
    const handleDeleteRow = (username) => {
        if (username === 'admin') {
            alert('Cannot delete admin user.');
            return;
        }
        //filter out the user with the username that passed to the function who matches the user in the iteration
        const updatedUsers = users.filter(user => user.username !== username);
        // Update the users in local storage
        localStorage.setItem('users', JSON.stringify(updatedUsers));
        // Update the state to reflect the deletion
        setUsers(updatedUsers);

    };

    // function for editing the user details
    const handleEditRow = (username, field, value) => {
        // Update the user details with the new values
        const updatedUsers = users.map(user => (user.username === username ? { ...user, [field]: value } : user));
        // Update the users in local storage
        localStorage.setItem('users', JSON.stringify(updatedUsers));
        // Update the state to reflect the changes
        setUsers(updatedUsers);

    };


    const handleEditBirthDate = (username, newValue) => {
        // Convert the input text to a valid date string
        const parts = newValue.split('/'); // Assuming the input format is 'DD/MM/YYYY'
        const formattedDate = `${parts[2]}-${parts[1]}-${parts[0]}`;

        const [day, month, year] = newValue.split('/');

        // Validate the day, month, and year
        const isValidDate = dayjs(`${year}-${month}-${day}`, 'YYYY-MM-DD', true).isValid();

        // If the input is not a valid date, return and dont change anything
        if (!isValidDate) {
            return;
        }

        // Update the user's birthdate with the new value
        const updatedUsers = users.map(user => (
            user.username === username ? { ...user, birthDate: formattedDate } : user
        ));

        // Update the users in local storage
        localStorage.setItem('users', JSON.stringify(updatedUsers));

        // Update the state to reflect the changes
        setUsers(updatedUsers);
    };

    const handleImageUpload = (e, username) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = (event) => {
            const newImageUrl = event.target.result;
    
            // Update the user's image in the state
            const updatedUsers = users.map(user =>
                user.username === username ? { ...user, img: newImageUrl } : user
            );
            setUsers(updatedUsers);
    
            // Update the user's image in local storage
            localStorage.setItem('users', JSON.stringify(updatedUsers));
        };
        reader.readAsDataURL(file);
    };
    

    // Function to handle key press event on editable fields
    const handleKeyPress = (e, username, field, value) => {
        if (e.key === 'Enter') {
            e.preventDefault(); // Prevent newline character (\n) from being added
            if (field === 'birthDate') {
                handleEditBirthDate(username, value);
            } else {
                handleEditRow(username, field, value);
            }
            e.target.blur(); // Remove focus from the input field after saving
        }
    };

    return (
        <div>
            <h2>Welcome, {props.user.username}! 👋🏻</h2>
            <p>To change the users details by double clicking the field,</p>
            <p>and you can save the change by pressing enter or cliking the screen.</p>

            <Button variant="outlined" onClick={props.onLogout}>Logout</Button>
            <br />    <br />
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="user table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Image</TableCell>
                            <TableCell>Username</TableCell>

                            <TableCell align="left">First Name</TableCell>
                            <TableCell align="left">Last Name</TableCell>
                            <TableCell align="left">Birth Day</TableCell>
                            <TableCell align="left">Email</TableCell>
                            <TableCell align="right">City</TableCell>
                            <TableCell align="right">Street</TableCell>
                            <TableCell align="right">House Number</TableCell>

                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user, index) => (
                            <TableRow key={index}>
                                <TableCell>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>

                                        <input
                                            id={`upload-photo-${user.username}`}
                                            type="file"
                                            accept=".jpg, .jpeg, .png"
                                            style={{ display: 'none' }}
                                            onChange={(e) => handleImageUpload(e, user.username)}
                                        />

                                        <label htmlFor={`upload-photo-${user.username}`}>
                                            <Avatar alt="User Image" src={user.img} />
                                        </label>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <span
                                        contentEditable={user.username !== 'admin'}
                                        suppressContentEditableWarning
                                        onBlur={(e) => handleEditRow(user.username, 'username', e.target.innerText)}
                                        onKeyDown={(e) => handleKeyPress(e, user.username, 'email', e.target.innerText)}
                                    >
                                        {user.username}
                                    </span>
                                </TableCell>
                                <TableCell align="left">
                                    <span
                                        contentEditable={user.username !== 'admin'}
                                        suppressContentEditableWarning
                                        onBlur={(e) => {
                                            handleEditRow(user.username, 'firstName', e.target.innerText);
                                        }}
                                        onKeyDown={(e) => handleKeyPress(e, user.username, 'firstName', e.target.innerText)}

                                    >
                                        {user.firstName}
                                    </span>
                                </TableCell>

                                <TableCell align="left">
                                    <span
                                        contentEditable={user.username !== 'admin'}
                                        suppressContentEditableWarning
                                        onBlur={(e) => {
                                            handleEditRow(user.username, 'lastName', e.target.innerText);
                                        }}
                                        onKeyDown={(e) => handleKeyPress(e, user.username, 'lastName', e.target.innerText)}

                                    >
                                        {user.lastName}
                                    </span>
                                </TableCell>
                                <TableCell align="left">
                                    <span
                                        contentEditable={user.username !== 'admin'}
                                        suppressContentEditableWarning
                                        onBlur={(e) => handleEditBirthDate(user.username, e.target.innerText)}
                                        onKeyDown={(e) => handleKeyPress(e, user.username, 'birthDate', e.target.innerText)}

                                    >
                                        {dayjs(user.birthDate).locale('he').format('DD/MM/YYYY')}

                                    </span>
                                </TableCell>
                                <TableCell align="right">
                                    <span
                                        // contentEditable={user.username !== 'admin'}
                                        suppressContentEditableWarning
                                        onBlur={(e) => handleEditRow(user.username, 'email', e.target.innerText)}
                                        onKeyDown={(e) => handleKeyPress(e, user.username, 'email', e.target.innerText)}

                                    >
                                        {user.email}
                                    </span>
                                </TableCell>
                                <TableCell align="right">
                                    <span
                                        contentEditable={user.username !== 'admin'}
                                        suppressContentEditableWarning
                                        onBlur={(e) => handleEditRow(user.username, 'city', e.target.innerText)}
                                        onKeyDown={(e) => handleKeyPress(e, user.username, 'city', e.target.innerText)}

                                    >
                                        {user.city}
                                    </span>
                                </TableCell>

                                <TableCell align="right">
                                    <span
                                        contentEditable={user.username !== 'admin'}
                                        suppressContentEditableWarning
                                        onBlur={(e) => handleEditRow(user.username, 'streetName', e.target.innerText)}
                                        onKeyDown={(e) => handleKeyPress(e, user.username, 'streetName', e.target.innerText)}

                                    >
                                        {user.streetName}
                                    </span>
                                </TableCell>

                                <TableCell align="right">
                                    <span
                                        contentEditable={user.username !== 'admin'}
                                        suppressContentEditableWarning
                                        onBlur={(e) => handleEditRow(user.username, 'houseNumber', e.target.innerText)}
                                    >
                                        {user.houseNumber}
                                    </span>
                                </TableCell>

                                <TableCell align="right">
                                    <IconButton aria-label="delete" onClick={() => handleDeleteRow(user.username)}>
                                        <DeleteIcon />
                                    </IconButton>

                                </TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

SystemAdmin.propTypes = {
    user: PropTypes.object.isRequired,
    onLogout: PropTypes.func.isRequired
};
