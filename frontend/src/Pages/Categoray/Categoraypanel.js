import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import axiosInstance from '../../api/axiosConfig';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

const Categoraypanel = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const columns = [
    { field: '_id', headerName: 'ID', width: 150 },
    { field: 'cname', headerName: 'Category Name', width: 200 },
    { field: 'description', headerName: 'Description', width: 250 },
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
    fetchCategories();
  }, []);

  const fetchCategories = () => {
    setLoading(true);
    axiosInstance
      .get('/category/catlist')
      .then((response) => {
        console.log(response.data);
        if (Array.isArray(response.data)) {
          setCategories(response.data);
        } else {
          setCategories([]);
        }
      })
      .catch((error) => {
        console.error('Error fetching categories:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to fetch categories',
        });
        setCategories([]);
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
          .delete(`/category/deletecat/${rowData._id}`)
          .then(() => {
            Swal.fire({
              icon: 'success',
              title: 'Deleted!',
              text: 'Category has been deleted',
              showConfirmButton: false,
              timer: 1200,
            });
            fetchCategories();
          })
          .catch((error) => {
            console.error('Error deleting category:', error);
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Failed to delete category',
            });
          });
      }
    });
  };

  const onUpdateHandler = (event, rowData) => {
    console.log('Update category:', rowData);
    // TODO: Implement update functionality
  };

  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <h2>Categories</h2>
      <div style={{ margin: '40px', cellSpacing: '30px' }}>
        <Button variant="outlined" color="secondary" sx={{ marginRight: '2%' }}>
          <Link to={'/cat'} style={{ textDecoration: 'none', color: 'inherit' }}>
            Add Category
          </Link>
        </Button>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <DataGrid
          rows={categories}
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

export default Categoraypanel;
