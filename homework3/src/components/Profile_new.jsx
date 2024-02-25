import { useState } from 'react';
import PropTypes from 'prop-types';
import Avatar from '@mui/joy/Avatar';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import CardActions from '@mui/joy/CardActions';
import Button from '@mui/joy/Button';
import ButtonGroup from '@mui/joy/ButtonGroup';
import Typography from '@mui/joy/Typography';
import EmailIcon from '@mui/icons-material/Email';
import HomeIcon from '@mui/icons-material/Home';
import CakeIcon from '@mui/icons-material/Cake';
import dayjs from 'dayjs'

export default function Profile({ user, onLogout, onEdit }) {
    Profile.propTypes = {
        user: PropTypes.object.isRequired,
        onLogout: PropTypes.func.isRequired,
        onEdit: PropTypes.func.isRequired,
    };
    // eslint-disable-next-line no-unused-vars
    const [isEditingProfile, setIsEditingProfile] = useState(false);

    const handleEditAccount = () => {
        setIsEditingProfile(true);
        onEdit(true); // Notify parent component that edit mode is activated
    };
    const handleLogout = () => {
        onLogout();
    };

    const birthDate = dayjs(user.birthDate);
    const day = birthDate.format('DD');
    const month = birthDate.locale('he').format('MMMM'); 
    const year = birthDate.format('YYYY');

    return (
        <Card sx={{ width: 520, maxWidth: '100%', boxShadow: 'lg' }}>
            <CardContent sx={{ alignItems: 'center', textAlign: 'center' }}>
                <Avatar src={`/static/images/avatar/${user.img}`} sx={{ '--Avatar-size': '6rem' ,marginBottom:'-3%'}} />
                <br />
                <Typography level="title-lg" sx={{ fontSize: '23px' }}>{user.username}</Typography>
                <Typography level="body-sm" sx={{ maxWidth: '100%' }}>

                    <Typography sx={{ fontSize: '20px' }}>
                        <span style={{ paddingRight: '20%', marginTop: '2%' }}>
                            {user.email}
                        </span>
                        <EmailIcon sx={{ marginTop: '-12%' , display:'flex', marginLeft:'auto'}} />
                    </Typography><br />

                    <Typography sx={{ fontSize: '20px' }}>
                        <span style={{ paddingRight: '10%', marginTop: '2%' }}>
                            {user.streetName} {user.houseNumber}, {user.city}
                        </span>
                        <HomeIcon sx={{ marginTop: '-12%' , display:'flex', marginLeft:'auto'}} />
                    </Typography><br />

                    <Typography sx={{ fontSize: '20px' }}>
                    <span style={{ paddingRight: '10%', marginTop: '2%' }}>
                            {year}, {month} {day}
                        </span>
                        <CakeIcon sx={{ marginTop: '-12%' , display:'flex', marginLeft:'auto'}} />
                        
                    </Typography><br />

                </Typography>
            </CardContent>
            <CardOverflow sx={{ bgcolor: 'background.level1' }}>
                <CardActions buttonFlex="1">
                    <ButtonGroup variant="outlined" sx={{ bgcolor: 'background.surface' }}>
                        <Button onClick={handleEditAccount}>Edit Account</Button>
                        <Button component="a" href="https://games.yo-yoo.co.il/games_play.php?game=729" target="_blank" rel="noopener noreferrer">Game</Button>
                        <Button onClick={handleLogout}>Log Out</Button>
                    </ButtonGroup>
                </CardActions>
            </CardOverflow>
        </Card>
    );
}