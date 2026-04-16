import React, { useState, useEffect } from 'react';
import axiosInstance from '../../api/axiosConfig';
import { TextField, Button, InputAdornment, Box, Alert, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EventIcon from '@mui/icons-material/Event';
import Swal from 'sweetalert2';

const Addcomments = (props) => {
  const [commentInput, setCommentInput] = useState({
    comment: '',
    subject: '',
    status: 'active',
    created: new Date().toISOString().split('T')[0],
    post_id: ''
  });
  const [postList, setPostList] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch posts list
    axiosInstance.get('/post/posts')
      .then((response) => {
        console.log('Posts list:', response.data);
        setPostList(response.data);
      })
      .catch((err) => {
        console.log('Error fetching posts:', err);
      });
  }, []);

  function handleSubmit(event) {
    event.preventDefault();

    if (!commentInput.comment.trim() || !commentInput.subject.trim() || !commentInput.post_id) {
      setError('Please fill all required fields');
      return;
    }

    axiosInstance({
      method: 'post',
      url: '/comment/Postcommnents',
      data: commentInput
    })
      .then(function (response) {
        console.log(response)
        console.log('Added successfully');
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Comment added successfully',
          showConfirmButton: false,
          timer: 1500,
        })
        props.setIsAdding(false);
        props.fetchCommentData();
      })
      .catch(function (error) {
        console.log(error);
        setError(error.response?.data?.message || 'Failed to add comment');
      });
  }
  
  function cancleHandler() {
    props.setIsAdding(false);
  }

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
          value={commentInput.comment}
          onChange={(event) =>
            setCommentInput({ ...commentInput, comment: event.target.value })
          }
          multiline
          rows={4}
          variant="outlined"
          fullWidth
          required
          sx={{ mb: 2 }}
        />
        
        <TextField
          id="subject"
          name="subject"
          label="Subject"
          placeholder="Enter subject"
          value={commentInput.subject}
          onChange={(event) =>
            setCommentInput({ ...commentInput, subject: event.target.value })
          }
          variant="outlined"
          fullWidth
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
          value={commentInput.status}
          onChange={(event) =>
            setCommentInput({ ...commentInput, status: event.target.value })
          }
          select
          SelectProps={{
            native: true,
          }}
          variant="outlined"
          fullWidth
          sx={{ mb: 2 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <VisibilityIcon />
              </InputAdornment>
            ),
          }}
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </TextField>

        <TextField
          id="created"
          name="created"
          label="Date"
          type="date"
          value={commentInput.created}
          onChange={(event) =>
            setCommentInput({ ...commentInput, created: event.target.value })
          }
          variant="outlined"
          fullWidth
          sx={{ mb: 2 }}
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
        />

        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel id="post_id">Select Post</InputLabel>
          <Select
            labelId="post_id"
            id="post_id"
            label="Select Post"
            value={commentInput.post_id}
            onChange={(event) =>
              setCommentInput({ ...commentInput, post_id: event.target.value })
            }
          >
            {postList.map((post) => (
              <MenuItem key={post._id} value={post._id}>
                {post.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

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

export default Addcomments;
