
import { DataGrid } from '@mui/x-data-grid';
import * as React from 'react';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import axiosInstance from '../../api/axiosConfig';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

const Commentpanel = () => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  const columns = [
    { field: '_id', headerName: 'ID', width: 120 },
    { field: 'subject', headerName: 'Subject', width: 150 },
    { field: 'comment', headerName: 'Comment', width: 250 },
    { field: 'post_id', headerName: 'Post ID', width: 150 },
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
    fetchComments();
  }, []);

  const fetchComments = () => {
    setLoading(true);
    axiosInstance
      .get('/comment/commentsdata')
      .then((response) => {
        console.log(response.data);
        if (Array.isArray(response.data)) {
          setComments(response.data);
        } else {
          setComments([]);
        }
      })
      .catch((error) => {
        console.error('Error fetching comments:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to fetch comments',
        });
        setComments([]);
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
          .delete(`/comment/deletecomment/${rowData._id}`)
          .then(() => {
            Swal.fire({
              icon: 'success',
              title: 'Deleted!',
              text: 'Comment has been deleted',
              showConfirmButton: false,
              timer: 1200,
            });
            fetchComments();
          })
          .catch((error) => {
            console.error('Error deleting comment:', error);
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Failed to delete comment',
            });
          });
      }
    });
  };

  const onUpdateHandler = (event, rowData) => {
    console.log('Update comment:', rowData);
    // TODO: Implement update functionality
  };

  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <h2>Comments</h2>
      <div style={{ margin: '40px', cellSpacing: '30px' }}>
        <Button variant="outlined" color="secondary" sx={{ marginRight: '2%' }}>
          <Link to={'/comments'} style={{ textDecoration: 'none', color: 'inherit' }}>
            Add Comment
          </Link>
        </Button>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <DataGrid
          rows={comments}
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

export default Commentpanel;
