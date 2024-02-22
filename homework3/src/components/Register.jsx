/* eslint-disable react/prop-types */
import { useState } from 'react';

import Button from '@mui/material/Button';
import TaskAlt from '@mui/icons-material/TaskAlt';
import TextField from '@mui/material/TextField';


export default function Register(props){
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
        houseNumber: ''
    });

    // for input change
    const handleChange = (e)=>{
        const {name, value}= e.target;
        setFormData({...formData, [name]:value});
    }

    // for form submission
    const handleSubmit = (e)=>{
        e.preventDefault();

        if(validForm()){
            props.registerUser(formData); //call the parent
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
                houseNumber: ''
            });
        }else{
            alert('Please fill out all the fields correctly');
        }
    };

    // for file change
    const handleFileChange = (e)=>{
        const file = e.target.files[0];
        if(file){
            setFormData({...formData, [formData.img]:file});
        }
    }

    const validForm = () =>{
        //checking username validation
        const usernameRegex = /^[A-Za-z0-9!@#$%^&*()-+=_]{1,60}$/;
        if (!formData.username.match(usernameRegex)) return false;
        
        // checking passwords validation
        const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()-+=])[A-Za-z0-9!@#$%^&*()-+=]{7,12}$/;
        if(!formData.password.match(passwordRegex)) return false;

        // checking password confirmation
        if(formData.password !== formData.passwordVerify) return false;

        // checking picture format
        const isGoodPicture = ['jpg', 'ipeg'];
        const fileExtenstion = formData.img.split('.').pop().toLowerCase();
        if(!isGoodPicture.includes(fileExtenstion)) return false;

        //checking firstName validation
        if(typeof formData.firstName !== 'string') return false;
        //checking lastName validation
        if(typeof formData.lastName !== 'string') return false;

        //checking email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email.match(emailRegex)) return false; 
        
        //checking birthDate validation
        const age = new Date().getFullYear()-formData.birthDate.getFullYear();
        if(!(age>18&&age<=120)) return false;

        //checking city validation
        const cities =['תל אביב','רמת גן','נתניה','נהריה','גבעתיים','רעננה','הרצליה','חולון','ראשון לציון','חיפה','ירושלים','בנימינה','זכרון יעקב','טבריה','רמת השרון','קריית שמונה','קריית גת'];
        if(!cities.includes(formData.city)) return false;

        //checking street name validation
        if(typeof formData.streetName !== 'string') return false;

        //checking street number validation
        if(isNaN(formData.houseNumber) || formData.houseNumber <= 0) return false;

        return true;
        
    };

    const isValid=(field,pattern)=>{
        return field.match(pattern);
    }

    return(
        <div>
            <h3>Register</h3>
            <form onSubmit={handleSubmit}>
            <div>
            <TextField 
                label={'Username'} 
                id="margin-dense" 
                margin="right" 
                onChange={handleChange} 
                required
                error={!isValid(formData.username, /^[A-Za-z0-9!@#$%^&*()-+=_]{1,60}$/)}
                helperText={!isValid(formData.username, /^[A-Za-z0-9!@#$%^&*()-+=_]{1,60}$/)?'ת לועזיות, מספרים ותווים מיוחדים':''}
            />
            </div>    
            <div>
                

                <input 
                    type="text" id="username" name="username" onChange={handleChange} required 
                    pattern='/^[A-Za-z0-9!@#$%^&*()-+=_]{1,60}$/'
                    onInvalid={(e)=>e.target.setCustomValidity('השתמש באותיות לועזיות, מספרים ותווים מיוחדים')}
                    onInput={(e) => e.target.setCustomValidity('')}>
                </input>
                
                
                <label htmlFor='username'> :שם משתמש</label>
            </div>

            <div> 
                <input 
                    type="text" id="password" name="password" onChange={handleChange} required
                    onInvalid={(e)=>e.target.setCustomValidity('סיסמא מכילה 7-12 תווים, אות גדולה, מספר ותו מיוחד')}
                    onInput={(e) => e.target.setCustomValidity('')}>
                </input>
                <label htmlFor='password'> :סיסמא</label>
            </div>

            <div>
                <input 
                    type="text" id="passwordVerify" name="passwordVerify"  required
                    pattern={formData.password}
                    onInvalid={(e) => e.target.setCustomValidity('הסיסמאות לא תואמות')} 
                    onInput={(e) => e.target.setCustomValidity('')}>
                </input>
                <label htmlFor='passwordVerify'> :אימות סיסמא</label>
            </div>

            <div>
                <input 
                    type="file" id="img" name="img" accept='.jpg, .jpeg' value={formData.img} onChange={handleChange} required>
                </input>
                <label htmlFor='img'> :תמונה</label>
            </div>

            <div>
                <input 
                    type="text" id="firstName" name="firstName" onChange={handleFileChange} required
                    onInvalid={(e) => e.target.setCustomValidity('הסיסמאות לא תואמות')} 
                    onInput={(e) => e.target.setCustomValidity('')}>
                </input>
                <label htmlFor='firstName'> :שם פרטי</label>
            </div>

            <div>
                <input 
                    type="text" id="lastName" name="lastName" value={formData.lastName} required
                    onInvalid={(e) => e.target.setCustomValidity('הסיסמאות לא תואמות')} 
                    onInput={(e) => e.target.setCustomValidity('')}>

                </input>
                <label htmlFor='lastName'> :שם משפחה</label>
            </div>

            <div>
                
                <input 
                    type="text" id="email" name="email" value={formData.email} onChange={handleChange} required>

                </input>
                <label htmlFor='email'> :כתובת מייל</label>
            </div>

            <div>

                <input 
                    type="date" id="birthDate" name="birthDate" value={formData.birthDate} onChange={handleChange} required>

                </input>
                <label htmlFor='password'> :תאריך לידה</label>
            </div>

            <div>

                <input type="text" id="city" name="city" value={formData.city} onChange={handleChange} required />

                <label htmlFor='city'> :עיר</label>
            </div>

            <div>
                
                <input type="text" id="streetName" name="streetName" value={formData.streetName} onChange={handleChange} required />
                <label htmlFor='streetName'> :שם הרחוב</label>
            </div>

            <div>
                
                <input type="number" id="houseNumber" name="houseNumber" value={formData.houseNumber} onChange={handleChange} required />
                <label htmlFor='houseNumber'> :מספר בית</label>
            </div>

            {/* <button type="submit">שלח</button> */}
            <Button variant="contained" endIcon={<TaskAlt />}>
                Send
            </Button>
            </form>
        </div>
    );


        
}