import React, { useState, useEffect } from 'react';
import axiosInstance from '../../api/axiosConfig';
import { TextField, Button, InputAdornment, Box, Alert } from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EventIcon from '@mui/icons-material/Event';
import Swal from 'sweetalert2';

const  Editcomments  = (props) => {
  const [CommentInput, setCommentInput] = useState({
    comment: props.selectedComment.comment, 
    subject: props.selectedComment.subject, 
    status: props.selectedComment.status, 
    created: props.selectedComment.created, 
    post_id: props.selectedComment.post_id, 
  });
  const [error, setError] = useState('');
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axiosInstance.get('/post/posts');
      setPosts(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      console.error('Error fetching posts:', err);
    }
  };

  function handleSubmit(event) {
    event.preventDefault();

    if (!CommentInput.comment.trim() || !CommentInput.subject.trim()) {
      setError('Please fill all required fields');
      return;
    }

    axiosInstance({
      method: 'put',
      url: `/comment/UpdateComments/${props.selectedComment._id}`,
      data: CommentInput
    })
      .then(function (response) {
        console.log(response);
        console.log('Updated successfully');
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Comment updated successfully',
          showConfirmButton: false,
          timer: 1500,
        })
        props.setIsEditing(false);
        props.fetchCommentData();
        
      })
      .catch(function (error) {
        console.log(error);
        setError(error.response?.data?.message || 'Failed to update comment');
      });
  };

  function cancleHandler() {
    props.setIsEditing(false);
  }

  return (
    <div id="content" style={{ padding: '20px', backgroundColor: 'rgb(237, 229, 229)', boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)' }}>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <h2 style={{ marginBottom: '20px' }}>Update Comment</h2>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        <TextField
          id="comment"
          name="comment"
          label="Comment"
          placeholder="Enter your comment"
          value={CommentInput.comment}
          onChange={(event) =>
            setCommentInput({ ...CommentInput, comment: event.target.value })
          }
          multiline
          rows={4}
          fullWidth
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
          id="subject"
          name="subject"
          label="Subject"
          placeholder="Enter comment subject"
          value={CommentInput.subject}
          onChange={(event) =>
            setCommentInput({ ...CommentInput, subject: event.target.value })
          }
          fullWidth
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
          value={CommentInput.status}
          onChange={(event) =>
            setCommentInput({ ...CommentInput, status: event.target.value })
          }
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
          <option value="approved">Approved</option>
          <option value="pending">Pending</option>
          <option value="rejected">Rejected</option>
        </TextField>

        <TextField
          id="created"
          name="created"
          label="Date"
          type='date'
          value={CommentInput.created}
          onChange={(event) =>
            setCommentInput({ ...CommentInput, created: event.target.value })
          }
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

        <TextField
          id="post_id"
          name="post_id"
          label="Post"
          value={CommentInput.post_id}
          onChange={(event) =>
            setCommentInput({ ...CommentInput, post_id: event.target.value })
          }
          select
          SelectProps={{
            native: true,
          }}
          fullWidth
          variant="outlined"
          required
          sx={{ mb: 3 }}
        >
          <option value="">Select a post</option>
          {posts.map((post) => (
            <option key={post._id} value={post._id}>
              {post.title}
            </option>
          ))}
        </TextField>

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

export default Editcomments ;
