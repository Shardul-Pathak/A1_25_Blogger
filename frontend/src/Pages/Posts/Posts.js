import React, { useState, useEffect } from 'react';
import { TextField, Button, InputAdornment, Alert, CircularProgress, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import TitleIcon from '@mui/icons-material/Title';
import DescriptionIcon from '@mui/icons-material/Description';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EventIcon from '@mui/icons-material/Event';
import axiosInstance from '../../api/axiosConfig';
import Swal from 'sweetalert2';

const Posts = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [categories, setCategories] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    desc: '',
    status: 'published',
    created: new Date().toISOString().split('T')[0],
    cat_id: '',
    auth_id: '',
  });

  useEffect(() => {
    fetchDropdownData();
  }, []);

  const fetchDropdownData = async () => {
    try {
      const [catRes, authRes] = await Promise.all([
        axiosInstance.get('/category/catlist'),
        axiosInstance.get('/author/authlist'),
      ]);
      setCategories(Array.isArray(catRes.data) ? catRes.data : []);
      setAuthors(Array.isArray(authRes.data) ? authRes.data : []);
    } catch (err) {
      console.error('Error fetching dropdown data:', err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.desc.trim() || !formData.cat_id || !formData.auth_id) {
      setError('Please fill in all required fields');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await axiosInstance.post('/post/addpost', {
        title: formData.title,
        desc: formData.desc,
        status: formData.status,
        created: formData.created,
        cat_id: formData.cat_id,
        auth_id: formData.auth_id,
      });

      if (response.status === 200 || response.status === 201) {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Post added successfully',
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          navigate('/postpanel');
        });
      }
    } catch (err) {
      console.error('Error adding post:', err);
      setError(err.response?.data?.message || 'Failed to add post');
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error || 'Failed to add post',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="content" style={{ padding: '20px', backgroundColor: 'rgb(237, 229, 229)', boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)' }}>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <h2 style={{ marginBottom: '20px' }}>Add Post</h2>
        
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        <TextField
          id="title"
          name="title"
          label="Title"
          placeholder="Title"
          fullWidth
          value={formData.title}
          onChange={handleChange}
          required
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <TitleIcon />
              </InputAdornment>
            ),
          }}
          sx={{ mb: 2 }}
        />

        <TextField
          id="desc"
          name="desc"
          label="Description"
          placeholder="Add your content"
          fullWidth
          multiline
          rows={4}
          value={formData.desc}
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
          <option value="published">Published</option>
          <option value="draft">Draft</option>
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

        <TextField
          id="cat_id"
          name="cat_id"
          label="Category"
          placeholder="Select Category"
          fullWidth
          value={formData.cat_id}
          onChange={handleChange}
          select
          SelectProps={{
            native: true,
          }}
          required
          sx={{ mb: 2 }}
        >
          <option value="">Select a category</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </TextField>

        <TextField
          id="auth_id"
          name="auth_id"
          label="Author"
          placeholder="Select Author"
          fullWidth
          value={formData.auth_id}
          onChange={handleChange}
          select
          SelectProps={{
            native: true,
          }}
          required
          sx={{ mb: 2 }}
        >
          <option value="">Select an author</option>
          {authors.map((author) => (
            <option key={author._id} value={author._id}>
              {author.first_name} {author.last_name}
            </option>
          ))}
        </TextField>

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
            onClick={() => navigate('/postpanel')}
          >
            Cancel
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default Posts;
