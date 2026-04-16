
import { DataGrid } from '@mui/x-data-grid';
import * as React from 'react';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import axiosInstance from '../../api/axiosConfig';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

const Accountpanel = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const columns = [
    { field: '_id', headerName: 'ID', width: 120 },
    { field: 'fname', headerName: 'First Name', width: 130 },
    { field: 'lanme', headerName: 'Last Name', width: 130 },
    { field: 'email', headerName: 'Email', width: 180 },
    { field: 'phone', headerName: 'Phone', width: 130 },
    { field: 'status', headerName: 'Status', width: 120 },
    { field: 'created', headerName: 'Created', width: 150, type: 'dateTime', valueFormatter: (params) => new Date(params.value).toLocaleDateString() },
  ];

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    setLoading(true);
    axiosInstance
      .get('/users/getuser')
      .then((response) => {
        console.log(response.data);
        if (Array.isArray(response.data)) {
          console.log("Fetched users:", response.data);
          setUsers(response.data);
        } else {
          setUsers([]);
        }
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to fetch users',
        });
        setUsers([]);
      })
      .finally(() => setLoading(false));
  };

  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <h2>Accounts</h2>
      <div style={{ margin: '40px', cellSpacing: '30px' }}>
        <Button variant="outlined" color="secondary" sx={{ marginRight: '2%' }}>
          <Link to={'/accounts'} style={{ textDecoration: 'none', color: 'inherit' }}>
            Add User
          </Link>
        </Button>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <DataGrid
          rows={users}
          columns={columns}
          getRowId={(row) => row._id}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          disableRowSelectionOnClick
        />
      )}
    </Box>
  );
};

export default Accountpanel;
