import { DataGrid } from '@mui/x-data-grid';
import * as React from 'react';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';
import axios from 'http';

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'first_name', headerName: 'First Name', width: 150, editable: true },
  { field: 'last_name', headerName: 'Last Name', width: 150, editable: true },
  { field: 'email', headerName: 'Email', width: 200, editable: true },
  { field: 'phone', headerName: 'Phone', width: 150, editable: true, type: 'number' },
];

const Authorpanel = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:3001/author/authlist')
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={posts}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }};
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />
      
      <div style={{ margin: '40px', cellspacing: '30px' }}>
        <Button variant="outlined" color="secondary" sx={{ marginRight: '2%' }}>
          <Link to={'/authoradd'} style={{ textDecoration: 'none' }}>
            Add
          </Link>
        </Button>
        <Button variant="outlined" color="secondary" sx={{ marginRight: '2%' }}>
          <Link to={'/Authorup'} style={{ textDecoration: 'none' }}>
            Update
          </Link>
        </Button>
        <Button variant="outlined" color="secondary" sx={{ marginRight: '2%' }}>
          Delete
        </Button>
      </div>
    </Box>
  );
};

export default Authorpanel;
