import React, { useState } from 'react';
import { TextField, Button, InputAdornment, Alert, CircularProgress, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CategoryIcon from '@mui/icons-material/Category';
import DescriptionIcon from '@mui/icons-material/Description';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EventIcon from '@mui/icons-material/Event';
import axiosInstance from '../../api/axiosConfig';
import Swal from 'sweetalert2';

const Category = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    status: 'active',
    created: new Date().toISOString().split('T')[0],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.description.trim()) {
      setError('Please fill in all required fields');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await axiosInstance.post('/category/addcat', {
        name: formData.name,
        description: formData.description,
        status: formData.status,
        created: formData.created,
      });

      if (response.status === 200 || response.status === 201) {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Category added successfully',
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          navigate('/categoraypanel');
        });
      }
    } catch (err) {
      console.error('Error adding category:', err);
      setError(err.response?.data?.message || 'Failed to add category');
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error || 'Failed to add category',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="content" style={{ padding: '20px', backgroundColor: 'rgb(237, 229, 229)', boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)' }}>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <h2 style={{ marginBottom: '20px' }}>Add Category</h2>
        
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        <TextField
          id="name"
          name="name"
          label="Category Name"
          placeholder="Category Name"
          fullWidth
          value={formData.name}
          onChange={handleChange}
          required
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <CategoryIcon />
              </InputAdornment>
            ),
          }}
          sx={{ mb: 2 }}
        />

        <TextField
          id="description"
          name="description"
          label="Category Description"
          placeholder="Category Description"
          fullWidth
          multiline
          rows={3}
          value={formData.description}
          onChange={handleChange}
          required
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <DescriptionIcon />
              </InputAdornment>
            ),
          }}
          sx={{ mb: 2 }}
        />
        
        <TextField
          id="status"
          name="status"
          label="Status"
          placeholder="Status"
          fullWidth
          value={formData.status}
          onChange={handleChange}
          select
          SelectProps={{
            native: true,
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <VisibilityIcon />
              </InputAdornment>
            ),
          }}
          sx={{ mb: 2 }}
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </TextField>

        <TextField
          id="created"
          name="created"
          label="Date"
          type="date"
          value={formData.created}
          onChange={handleChange}
          fullWidth
          InputLabelProps={{
            shrink: true,
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EventIcon />
              </InputAdornment>
            ),
          }}
          sx={{ mb: 2 }}
        />

        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button 
            variant="outlined" 
            color="secondary" 
            type="submit"
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Submit'}
          </Button>
          <Button 
            variant="outlined" 
            color="primary" 
            onClick={() => navigate('/categoraypanel')}
          >
            Cancel
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default Category;
