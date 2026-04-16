import React, { useState, useEffect } from 'react';
import { TextField, Button, InputAdornment, Box, Alert } from '@mui/material';
import TitleIcon from '@mui/icons-material/Title';
import DescriptionIcon from '@mui/icons-material/Description';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EventIcon from '@mui/icons-material/Event';
import axiosInstance from '../../api/axiosConfig';
import Swal from 'sweetalert2';

const EditPosts = (props) => {
  const [Postdata, setPostdata] = useState({
    title: props.selectedPost.title,
    desc: props.selectedPost.desc,
    status: props.selectedPost.status,
    created: props.selectedPost.created,
    cat_id: props.selectedPost.cat_id,
    auth_id: props.selectedPost.auth_id,
  });
  const [error, setError] = useState('');
  const [categories, setCategories] = useState([]);
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    fetchDropdowns();
  }, []);

  const fetchDropdowns = async () => {
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

  function handleSubmit(event) {
    event.preventDefault();

    if (!Postdata.title.trim() || !Postdata.desc.trim()) {
      setError('Please fill all required fields');
      return;
    }

    axiosInstance({
      method: 'put',
      url: `/post/updatepost/${props.selectedPost._id}`,
      data: Postdata
    })
      .then(function (response) {
        console.log(response);
        console.log('Updated successfully');
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Post updated successfully',
          showConfirmButton: false,
          timer: 1500,
        })
        props.setIsEditing(false);
      })
      .catch(function (error) {
        console.log(error);
        setError(error.response?.data?.message || 'Failed to update post');
      });
  }

  function cancelHandler() {
    props.setIsEditing(false);
  }

  return (
    <div id="content" style={{ padding: '20px', backgroundColor: 'rgb(237, 229, 229)', boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)' }}>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <h2 style={{ marginBottom: '20px' }}>Update Post</h2>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        <TextField
          id="title"
          name="title"
          label="Title"
          placeholder="Enter post title"
          value={Postdata.title}
          fullWidth
          onChange={(event) =>
            setPostdata({ ...Postdata, title: event.target.value })
          }
          variant="outlined"
          required
          sx={{ mb: 2 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <TitleIcon />
              </InputAdornment>
            ),
          }}
        />

        <TextField
          id="desc"
          name="desc"
          label="Description"
          placeholder="Enter post description"
          value={Postdata.desc}
          fullWidth
          multiline
          rows={4}
          onChange={(event) =>
            setPostdata({ ...Postdata, desc: event.target.value })
          }
          variant="outlined"
          required
          sx={{ mb: 2 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <DescriptionIcon />
              </InputAdornment>
            ),
          }}
        />

        <TextField
          id="status"
          name="status"
          label="Status"
          value={Postdata.status}
          fullWidth
          onChange={(event) =>
            setPostdata({ ...Postdata, status: event.target.value })
          }
          select
          SelectProps={{
            native: true,
          }}
          variant="outlined"
          sx={{ mb: 2 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <VisibilityIcon />
              </InputAdornment>
            ),
          }}
        >
          <option value="published">Published</option>
          <option value="draft">Draft</option>
        </TextField>

        <TextField
          id="created"
          name="created"
          label="Date"
          type="date"
          value={Postdata.created}
          fullWidth
          onChange={(event) =>
            setPostdata({ ...Postdata, created: event.target.value })
          }
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          sx={{ mb: 2 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EventIcon />
              </InputAdornment>
            ),
          }}
        />

        <TextField
          id="cat_id"
          name="cat_id"
          label="Category"
          value={Postdata.cat_id}
          fullWidth
          onChange={(event) =>
            setPostdata({ ...Postdata, cat_id: event.target.value })
          }
          select
          SelectProps={{
            native: true,
          }}
          variant="outlined"
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
          value={Postdata.auth_id}
          fullWidth
          onChange={(event) =>
            setPostdata({ ...Postdata, auth_id: event.target.value })
          }
          select
          SelectProps={{
            native: true,
          }}
          variant="outlined"
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

export default EditPosts;
