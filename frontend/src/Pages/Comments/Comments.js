import React, { useState, useEffect } from 'react';
import { TextField, Button, InputAdornment, Alert, CircularProgress, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DescriptionIcon from '@mui/icons-material/Description';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EventIcon from '@mui/icons-material/Event';
import axiosInstance from '../../api/axiosConfig';
import Swal from 'sweetalert2';

const Comments = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [posts, setPosts] = useState([]);
  const [formData, setFormData] = useState({
    comment: '',
    subject: '',
    status: 'active',
    created: new Date().toISOString().split('T')[0],
    post_id: '',
  });

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await axiosInstance.get('/post/posts');
      setPosts(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error('Error fetching posts:', err);
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
    
    if (!formData.comment.trim() || !formData.subject.trim() || !formData.post_id) {
      setError('Please fill in all required fields');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await axiosInstance.post('/comment/Postcommnents', {
        comment: formData.comment,
        subject: formData.subject,
        status: formData.status,
        created: formData.created,
        post_id: formData.post_id,
      });

      if (response.status === 200 || response.status === 201) {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Comment added successfully',
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          navigate('/commentpanel');
        });
      }
    } catch (err) {
      console.error('Error adding comment:', err);
      setError(err.response?.data?.message || 'Failed to add comment');
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error || 'Failed to add comment',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="content" style={{ padding: '20px', backgroundColor: 'rgb(237, 229, 229)', boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)' }}>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <h2 style={{ marginBottom: '20px' }}>Add Comment</h2>
        
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        <TextField
          id="comment"
          name="comment"
          label="Add Comment"
          placeholder="Add your comment here"
          fullWidth
          multiline
          rows={4}
          value={formData.comment}
          onChange={handleChange}
          required
          sx={{ mb: 2 }}
        />

        <TextField
          id="subject"
          name="subject"
          label="Subject"
          placeholder="Subject"
          fullWidth
          value={formData.subject}
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

        <TextField
          id="post_id"
          name="post_id"
          label="Select Post"
          placeholder="Select a post"
          fullWidth
          value={formData.post_id}
          onChange={handleChange}
          select
          SelectProps={{
            native: true,
          }}
          required
          sx={{ mb: 2 }}
        >
          <option value="">Select a post</option>
          {posts.map((post) => (
            <option key={post._id} value={post._id}>
              {post.title}
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
            onClick={() => navigate('/commentpanel')}
          >
            Cancel
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default Comments;
