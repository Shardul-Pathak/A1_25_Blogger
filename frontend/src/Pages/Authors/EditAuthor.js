import React from 'react';
import './Authors.css';
import { TextField, Button, InputAdornment, Box } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import axiosInstance from '../../api/axiosConfig';
import Swal from 'sweetalert2';

const EditAuthor = (props) => {
  let [authInput, setAuthInput] = React.useState({
    first_name: props.selectedAuther.first_name,
    last_name: props.selectedAuther.last_name,
    email: props.selectedAuther.email,
    phone: props.selectedAuther.phone
  });

  function handleSubmit(event) {
    event.preventDefault();

    console.log(authInput);

    axiosInstance({
      method: 'put',
      url: `/author/updateauth/${props.selectedAuther._id}`,
      data: authInput
    })
    .then(function (response) {
      console.log(response)
      console.log('updated successfully')
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Author updated successfully',
        showConfirmButton: false,
        timer: 1500,
      })
      props.setIsEditing(false)
    })
    .catch(function (error) {
      console.log(error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to update author',
      });
    });
  }

  function cancleHandler () {
    props.setIsEditing(false);
  }

  return (
    <div id="content" className="formstyle">
      <form autoComplete="off" onSubmit={handleSubmit}>
        <h2>Edit Author</h2>
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
          placeholder="Enter email"
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
            Update
          </Button>
          <Button variant="outlined" color="primary" onClick={cancleHandler}>
            Cancel
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default EditAuthor;
