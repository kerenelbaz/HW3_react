import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import AdminEditUserInfo from './AdminEditUserInfo';
import dayjs from 'dayjs'
import Avatar from '@mui/material/Avatar';
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
import EditIcon from '@mui/icons-material/Edit';


export default function SystemAdmin(props) {
    const [users, setUsers] = useState([]);
    const [editingUser, setEditingUser] = useState();

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

    const handleEditUser = (user) => {
        setEditingUser(user);
    };

    const handleCloseEdit = () => {
        setEditingUser(null);
    };


    const handleSaveChanges = (editedUser) => {
        const users = JSON.parse(localStorage.getItem('users'));
        const userIndex = users.findIndex(u => u.id === editedUser.id);
        users[userIndex] = editedUser;
        localStorage.setItem('users', JSON.stringify(users));
    };



    return (
        <div>
            <h2>Welcome, {props.user.username}! 👋🏻</h2><br />


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

                                        <label htmlFor={`upload-photo-${user.username}`}>
                                            <Avatar alt="User Image" src={user.img} />
                                        </label>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <span>
                                        {user.username}
                                    </span>
                                </TableCell>
                                <TableCell align="left">
                                    <span>
                                        {user.firstName}
                                    </span>
                                </TableCell>

                                <TableCell align="left">
                                    <span>
                                        {user.lastName}
                                    </span>
                                </TableCell>
                                <TableCell align="left">
                                    <span>
                                        {dayjs(user.birthDate).locale('he').format('DD/MM/YYYY')}

                                    </span>
                                </TableCell>
                                <TableCell align="right">
                                    <span>
                                        {user.email}
                                    </span>
                                </TableCell>
                                <TableCell align="right">
                                    <span>
                                        {user.city}
                                    </span>
                                </TableCell>

                                <TableCell align="right">
                                    <span>
                                        {user.streetName}
                                    </span>
                                </TableCell>

                                <TableCell align="right">
                                    <span>
                                        {user.houseNumber}
                                    </span>
                                </TableCell>

                                <TableCell align="right">
                                    <IconButton aria-label="edit" onClick={() => handleEditUser(user)}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton aria-label="delete" onClick={() => handleDeleteRow(user.username)}>
                                        <DeleteIcon />
                                    </IconButton>

                                </TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {editingUser && (
                <AdminEditUserInfo //using help-component for the admin be able to edit the user details
                    user={editingUser}
                    onSave={handleSaveChanges}
                    onCancel={handleCloseEdit}
                />
            )}
        </div>
    );
}

SystemAdmin.propTypes = {
    user: PropTypes.object.isRequired,
    onLogout: PropTypes.func.isRequired,
};
