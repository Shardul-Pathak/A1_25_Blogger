import React, { useState } from 'react';
import { TextField, Button, InputAdornment, Box, Alert } from '@mui/material';
import CategoryIcon from '@mui/icons-material/Category';
import DescriptionIcon from '@mui/icons-material/Description';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EventIcon from '@mui/icons-material/Event';
import axiosInstance from '../../api/axiosConfig';
import Swal from 'sweetalert2';

const EditCategory = (props) => {
  const [catInput, setCatInput] = useState({
    cat_name: props.selectedCategory.cat_name,
    cat_desc: props.selectedCategory.cat_desc,
    status: props.selectedCategory.status,
    created: props.selectedCategory.created,
  });
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!catInput.cat_name.trim() || !catInput.cat_desc.trim()) {
      setError('Please fill all required fields');
      return;
    }

    try {
      await axiosInstance.put(
        `/category/updatecat/${props.selectedCategory._id}`,
        catInput
      );
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Category updated successfully',
        showConfirmButton: false,
        timer: 1500,
      });
      props.setIsEditing(false);
      if (props.fetchCategoryData) {
        props.fetchCategoryData();
      }
    } catch (err) {
      console.log(err);
      setError(err.response?.data?.message || 'Failed to update category');
    }
  };

  const cancelHandler = () => {
    props.setIsEditing(false);
  };

  return (
    <div id="content" style={{ padding: '20px', backgroundColor: 'rgb(237, 229, 229)', boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)' }}>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <h2 style={{ marginBottom: '20px' }}>Update Category</h2>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        <TextField
          id="cat_name"
          name="cat_name"
          label="Category Name"
          placeholder="Enter category name"
          value={catInput.cat_name}
          onChange={(event) => setCatInput({ ...catInput, cat_name: event.target.value })}
          fullWidth
          variant="outlined"
          required
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <CategoryIcon />
              </InputAdornment>
            ),
          }}
          sx={{ mb: 3 }}
        />

        <TextField
          id="cat_desc"
          name="cat_desc"
          label="Category Description"
          placeholder="Enter category description"
          value={catInput.cat_desc}
          onChange={(event) => setCatInput({ ...catInput, cat_desc: event.target.value })}
          fullWidth
          multiline
          rows={3}
          variant="outlined"
          required
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <DescriptionIcon />
              </InputAdornment>
            ),
          }}
          sx={{ mb: 3 }}
        />

        <TextField
          id="status"
          name="status"
          label="Status"
          value={catInput.status}
          onChange={(event) => setCatInput({ ...catInput, status: event.target.value })}
          select
          SelectProps={{
            native: true,
          }}
          fullWidth
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <VisibilityIcon />
              </InputAdornment>
            ),
          }}
          sx={{ mb: 3 }}
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </TextField>

        <TextField
          id="created"
          name="created"
          label="Date"
          type="date"
          value={catInput.created}
          onChange={(event) => setCatInput({ ...catInput, created: event.target.value })}
          fullWidth
          variant="outlined"
          required
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
          sx={{ mb: 3 }}
        />

        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button variant="contained" color="secondary" type="submit">
            Update
          </Button>
          <Button variant="outlined" color="primary" onClick={cancelHandler}>
            Cancel
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default EditCategory;
