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
        setUsers(prevUsers => prevUsers.filter(user => user.username !== username));
    };

    // function for editing the user details
    const handleEditRow = (username, field, value) => {
        setUsers(prevUsers =>
            // change the user details with the new values
            prevUsers.map(user => (user.username === username ? { ...user, [field]: value } : user))
        );

    };

    return (
        <div>
            <h2>Welcome, {props.user.username}!</h2>
            <p>You are logged in as a system admin.</p>
            <Button variant="outlined" onClick={props.onLogout}>Logout</Button>
            <br />    <br />
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="user table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Username</TableCell>

                            <TableCell align="left">Full Name</TableCell>
                            <TableCell align="left">Birth Day</TableCell>
                            <TableCell align="left">Email</TableCell>
                            <TableCell align="right">Address</TableCell>

                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user, index) => (
                            <TableRow key={index}>
                                <TableCell>
                                    <span
                                        contentEditable={user.username !== 'admin'}
                                        suppressContentEditableWarning
                                        onBlur={(e) => handleEditRow(user.username, 'username', e.target.innerText)}
                                    >
                                        {user.username}
                                    </span>
                                </TableCell>

                                <TableCell align="left">
                                    <span
                                        contentEditable={user.username !== 'admin'}
                                        suppressContentEditableWarning
                                        onBlur={(e) => {handleEditRow(user.username, 'fullname', e.target.innerText);
                                        }}
                                    >
                                        {user.firstName} {user.lastName}
                                    </span>
                                </TableCell>
                                <TableCell align="left">
                                    <span
                                        contentEditable={user.username !== 'admin'}
                                        suppressContentEditableWarning
                                        onBlur={(e) => handleEditRow(user.username, 'birthDay', e.target.innerText)}
                                    >
                                        {dayjs(user.birthDate).format('DD')} {dayjs(user.birthDate).locale('he').format('MMMM')} {dayjs(user.birthDate).format('YYYY')}
                                    </span>
                                </TableCell>
                                <TableCell align="right">
                                    <span
                                        contentEditable={user.username !== 'admin'}
                                        suppressContentEditableWarning
                                        onBlur={(e) => handleEditRow(user.username, 'email', e.target.innerText)}
                                    >
                                        {user.email}
                                    </span>
                                </TableCell>
                                <TableCell align="right">
                                    <span
                                        contentEditable={user.username !== 'admin'}
                                        suppressContentEditableWarning
                                        onBlur={(e) => handleEditRow(user.username, 'address', e.target.innerText)}
                                    >
                                        {user.city}
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
