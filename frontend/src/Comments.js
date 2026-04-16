import React from 'react';
import { TextField, Button, InputAdornment } from '@mui/material';
import CategoryIcon from '@mui/icons-material/Category';
import DescriptionIcon from '@mui/icons-material/Description';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EventIcon from '@mui/icons-material/Event';

const Comments = () => {
  function handleSubmit() {
    // TODO: Handle form submission
  }

  return (
    <div id="content" style={{ padding: '20px', backgroundColor: 'rgb(237, 229, 229)', boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)' }}>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <h2 style={{ marginBottom: '20px' }}>Comment Form</h2>
        <TextField
          id="Comments"
          name="Comments"
          label="Add Comments"
          defaultValue=""
          placeholder="Add Comments"
          fullWidth
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
          required
          id="subject"
          name="subject"
          label="Subject"
          defaultValue=""
          placeholder="Subject"
          fullWidth
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
          defaultValue=""
          placeholder="Status"
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <VisibilityIcon />
              </InputAdornment>
            ),
          }}
          sx={{ mb: 2 }}
        />

        <TextField
          required
          id="created"
          name="created"
          label="Date"
          type='date'
          defaultValue=""
          placeholder=""
          fullWidth
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
          required
          id="post_id"
          name="post_id"
          label="Post name"
          defaultValue=""
          placeholder=""
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EventIcon />
              </InputAdornment>
            ),
          }}
          sx={{ mb: 2 }}
        />

        <Button variant="outlined" color="secondary" type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default Comments;
