
import { DataGrid } from '@mui/x-data-grid';
import * as React from 'react';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import axiosInstance from '../../api/axiosConfig';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

const Postpanel = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const columns = [
    { field: '_id', headerName: 'ID', width: 120 },
    { field: 'title', headerName: 'Title', width: 180 },
    { field: 'description', headerName: 'Description', width: 200 },
    { field: 'auth_id', headerName: 'Author', width: 120 },
    { field: 'cat_id', headerName: 'Category', width: 120 },
    { field: 'status', headerName: 'Status', width: 120 },
    { field: 'created', headerName: 'Created', width: 150, type: 'dateTime', valueFormatter: (params) => new Date(params.value).toLocaleDateString() },
    { field: 'actions', headerName: 'Actions', width: 200, renderCell: (params) => {
      return (
        <div>
          <Button
            onClick={(e) => onUpdateHandler(e, params.row)}
            variant="contained"
            size="small"
            sx={{ marginRight: '10px' }}
          >
            Update
          </Button>
          <Button
            onClick={(e) => onDeleteHandler(e, params.row)}
            variant="contained"
            color="error"
            size="small"
          >
            Delete
          </Button>
        </div>
      );
    } }
  ];

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = () => {
    setLoading(true);
    axiosInstance
      .get('/post/posts')
      .then((response) => {
        console.log(response.data);
        if (Array.isArray(response.data)) {
          setPosts(response.data);
        } else {
          setPosts([]);
        }
      })
      .catch((error) => {
        console.error('Error fetching posts:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to fetch posts',
        });
        setPosts([]);
      })
      .finally(() => setLoading(false));
  };

  const onDeleteHandler = (event, rowData) => {
    Swal.fire({
      icon: 'warning',
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
    }).then((result) => {
      if (result.isConfirmed) {
        axiosInstance
          .delete(`/post/deletepost/${rowData._id}`)
          .then(() => {
            Swal.fire({
              icon: 'success',
              title: 'Deleted!',
              text: 'Post has been deleted',
              showConfirmButton: false,
              timer: 1200,
            });
            fetchPosts();
          })
          .catch((error) => {
            console.error('Error deleting post:', error);
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Failed to delete post',
            });
          });
      }
    });
  };

  const onUpdateHandler = (event, rowData) => {
    console.log('Update post:', rowData);
    // TODO: Implement update functionality
  };

  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <h2>Posts</h2>
      <div style={{ margin: '40px', cellSpacing: '30px' }}>
        <Button variant="outlined" color="secondary" sx={{ marginRight: '2%' }}>
          <Link to={'/posts'} style={{ textDecoration: 'none', color: 'inherit' }}>
            Add Post
          </Link>
        </Button>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <DataGrid
          rows={posts}
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

export default Postpanel;
