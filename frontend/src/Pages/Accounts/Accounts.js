import React, { useState } from 'react';
import './Authors.css';
import { TextField, Button, InputAdornment, Alert, CircularProgress, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LockIcon from '@mui/icons-material/Lock';
import EventIcon from '@mui/icons-material/Event';
import axiosInstance from '../../api/axiosConfig';
import Swal from 'sweetalert2';

const Accounts = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    phone: '',
    created: new Date().toISOString().split('T')[0],
    status: 'active',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    if (!formData.first_name.trim()) return 'First name is required';
    if (!formData.last_name.trim()) return 'Last name is required';
    if (!formData.email.trim()) return 'Email is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) return 'Invalid email format';
    if (!formData.password) return 'Password is required';
    if (formData.password.length < 6) return 'Password must be at least 6 characters';
    if (!formData.phone.trim()) return 'Phone number is required';
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await axiosInstance.post('/users/adduser', {
        first_name: formData.first_name,
        last_name: formData.last_name,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        created: formData.created,
        status: formData.status,
      });

      if (response.status === 200 || response.status === 201) {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'User registered successfully',
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          navigate('/accountpanel');
        });
      }
    } catch (err) {
      console.error('Error registering user:', err);
      const errorMsg = err.response?.data?.message || err.response?.data?.error || 'Failed to register user';
      setError(errorMsg);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: errorMsg,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="content" className="formstyle">
      <form autoComplete="off" onSubmit={handleSubmit}>
        <h2>Register User</h2>
        
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        <TextField
          id="first_name"
          name="first_name"
          label="First Name"
          value={formData.first_name}
          onChange={handleChange}
          required
          error={!!error && error.includes('First')}
          InputProps={{
            startAdornment: <InputAdornment position="start"><AccountCircleIcon /></InputAdornment>,
          }}
          fullWidth
          sx={{ mb: 3 }}
        />

        <TextField
          id="last_name"
          name="last_name"
          label="Last Name"
          value={formData.last_name}
          onChange={handleChange}
          required
          error={!!error && error.includes('Last')}
          InputProps={{
            startAdornment: <InputAdornment position="start"><AccountCircleIcon /></InputAdornment>,
          }}
          fullWidth
          sx={{ mb: 3 }}
        />

        <TextField
          id="email"
          name="email"
          label="Email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
          error={!!error && error.includes('email')}
          InputProps={{
            startAdornment: <InputAdornment position="start"><EmailIcon /></InputAdornment>,
          }}
          fullWidth
          sx={{ mb: 3 }}
        />

        <TextField
          id="password"
          name="password"
          label="Password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          required
          error={!!error && error.includes('assword')}
          helperText="Minimum 6 characters"
          InputProps={{
            startAdornment: <InputAdornment position="start"><LockIcon /></InputAdornment>,
          }}
          fullWidth
          sx={{ mb: 3 }}
        />

        <TextField
          id="phone"
          name="phone"
          label="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          required
          error={!!error && error.includes('phone')}
          InputProps={{
            startAdornment: <InputAdornment position="start"><PhoneIcon /></InputAdornment>,
          }}
          fullWidth
          sx={{ mb: 3 }}
        />

        <TextField
          id="created"
          name="created"
          label="Date"
          type="date"
          value={formData.created}
          onChange={handleChange}
          InputLabelProps={{
            shrink: true,
          }}
          InputProps={{
            startAdornment: <InputAdornment position="start"><EventIcon /></InputAdornment>,
          }}
          fullWidth
          sx={{ mb: 3 }}
        />

        <TextField
          id="status"
          name="status"
          label="Status"
          value={formData.status}
          onChange={handleChange}
          select
          SelectProps={{
            native: true,
          }}
          fullWidth
          sx={{ mb: 3 }}
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </TextField>

        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button 
            variant="outlined" 
            color="secondary" 
            type="submit"
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Register'}
          </Button>
          <Button 
            variant="outlined" 
            color="primary" 
            onClick={() => navigate('/accountpanel')}
          >
            Cancel
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default Accounts;
