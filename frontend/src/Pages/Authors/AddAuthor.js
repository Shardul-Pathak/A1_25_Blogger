import React from 'react';
import './Authors.css';
import { TextField, Button, InputAdornment, Box, Alert } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import axiosInstance from '../../api/axiosConfig';
import Swal from 'sweetalert2';

const AddAuthor = (props) => {
  let [authInput, setAuthInput] = React.useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: ''
  });
  const [error, setError] = React.useState('');
  
  function handleSubmit(event) {
    event.preventDefault();
    
    if (!authInput.first_name.trim() || !authInput.last_name.trim() || !authInput.email.trim() || !authInput.phone.trim()) {
      setError('All fields are required');
      return;
    }

    console.log(authInput);

    axiosInstance({
      method: 'post',
      url: `/author/addauth`,
      data: authInput
    })
    .then(function (response) {
      console.log(response)
      console.log('added successfully')
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Author added successfully',
        showConfirmButton: false,
        timer: 1500,
      })
      props.setIsAdding(false)
    })
    .catch(function (error) {
      console.log(error);
      setError(error.response?.data?.message || 'Failed to add author');
    });
  }
  
  function cancleHandler () {
    props.setIsAdding(false);
  }

  return (
    <div id="content" className="formstyle">
      <form autoComplete="off" onSubmit={handleSubmit}>
        <h2>Add Author</h2>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        
        <TextField
          id="first_name"
          name="first_name"
          label="First Name"
          placeholder="Enter first name"
          value={authInput.first_name}
          onChange={event => setAuthInput({...authInput, first_name: event.target.value})}
          variant="outlined"
          InputProps={{
            startAdornment: <InputAdornment position="start"><AccountCircleIcon /></InputAdornment>,
          }}
          fullWidth
          required
          sx={{ mb: 3 }}
        />

        <TextField
          id="last_name"
          name="last_name"
          label="Last Name"
          placeholder="Enter last name"
          value={authInput.last_name}
          onChange={event => setAuthInput({...authInput, last_name: event.target.value})}
          variant="outlined"
          InputProps={{
            startAdornment: <InputAdornment position="start"><AccountCircleIcon /></InputAdornment>,
          }}
          fullWidth
          required
          sx={{ mb: 3 }}
        />
        
        <TextField
          id="email"
          name="email"
          label="Email"
          placeholder="Enter email address"
          type="email"
          value={authInput.email}
          onChange={event => setAuthInput({...authInput, email: event.target.value})}
          variant="outlined"
          InputProps={{
            startAdornment: <InputAdornment position="start"><EmailIcon /></InputAdornment>,
          }}
          fullWidth
          required
          sx={{ mb: 3 }}
        />

        <TextField
          id="phone"
          name="phone"
          label="Phone Number"
          placeholder="Enter phone number"
          value={authInput.phone}
          onChange={event => setAuthInput({...authInput, phone: event.target.value})}
          variant="outlined"
          InputProps={{
            startAdornment: <InputAdornment position="start"><PhoneIcon /></InputAdornment>,
          }}
          fullWidth
          required
          sx={{ mb: 3 }}
        />
        
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button variant="contained" color="secondary" type="submit">
            Submit
          </Button>
          <Button variant="outlined" color="primary" onClick={cancleHandler}>
            Cancel
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default AddAuthor;
