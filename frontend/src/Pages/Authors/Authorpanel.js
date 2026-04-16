
import { DataGrid } from '@mui/x-data-grid';
import * as React from 'react';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import axiosInstance from '../../api/axiosConfig';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import AddAuthor from './AddAuthor';
import EditAuthor from './EditAuthor';

const Authorpanel = () => {

  const apiUrl = process.env.REACT_APP_API_URL;
  console.log("API URL:", apiUrl);
  
  const [authors, setauthor] = useState([]);
  const [selectedAuther,setSelectedAuther] = useState(null)
  const [isAdding,setIsAdding] = useState(false);
  const [isEditing,setIsEditing] = useState(false)

  const columns = [
    { field: '_id', headerName: 'ID', width: 120 },
    { field: 'first_name', headerName: 'First Name', width: 130 },
    { field: 'last_name', headerName: 'Last Name', width: 130 },
    { field: 'email', headerName: 'Email', width: 180 },
    { field: 'phone', headerName: 'Phone', width: 130 },
    { field: 'status', headerName: 'Status', width: 120 },
    { field: 'created', headerName: 'Created', width: 150, type: 'dateTime', valueFormatter: (params) => new Date(params.value).toLocaleDateString() },
    { field: 'actions', headerName: 'Actions', width: 300, renderCell: (params) => {
      return (
        <div>
          <Button
            onClick={(e) => onUpdateHandler(e, params.row)}
            variant="contained"
            sx={{ marginRight: '3%' }}
          >
            Update
          </Button>
          <Button
            onClick={(e) => onDeleteHandler(e, params.row)}
            variant="contained"
          >
            Delete
          </Button>
        </div>
      );
    } }
  ];

  useEffect(() => {
    axiosInstance
      .get(`/author/authlist`)
      .then((response) => {
        console.log(response.data)
        setauthor(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  let onDeleteHandler = (event, rowData) =>{
      let authId = rowData._id;
      Swal.fire({
        icon:"warning",
        title:"Are you sure you want to delete",
        text:"You wont able to revert this ",
        showCancelButton:true,
        confirmButtonText:"yes",
        cancelButtonText:"No",
      }).then(result =>{
          if (result.value) {
            let deleteAuthApi =  `/author/deleteauth/${authId}`;
            axiosInstance.delete(deleteAuthApi)
            .then(function (response) {
                console.log("-----Auth deleted----",response.data);

                Swal.fire({
                  icon:"success",
                  title:'deleted',
                  text:`Auth has been deleted`,
                  showConfirmButton:false,
                  timer:1200,
                }).then((res)=>{
                  
                  setauthor(authors.filter(auth => auth._id !== authId));
                });

            })
            .catch(function (error) {
                // handle error
                console.log(error);
            });
          
          }
    })
  }
  let onUpdateHandler = (event, rowData) =>{
    console.log(rowData);
    const [author] = authors.filter(auth => auth._id === rowData._id);

    setSelectedAuther(author);
    setIsEditing(true);
  }

  let onAddHandler = () =>{
    setIsAdding(true);
  }

  return (
    <React.Fragment>
      <Box sx={{ height: 400, width: '100%' }}>
      <h2>Author</h2>
      {!isAdding && !isEditing &&(
        <>
        <div style={{ margin: '40px', cellspacing: '30px' }}>
          <Button onClick={onAddHandler} variant="outlined" color="secondary" sx={{ marginRight: '2%' }}>
              Add
          </Button>
        </div>
        <DataGrid
          rows={authors}
          columns={columns}
          getRowId={(row) => row._id} 
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          pageSizeOptions={[10]}
          checkboxSelection
          disableRowSelectionOnClick
        />
        </>
        )}
        {/* For Adding  */}
        {isAdding && (
          <AddAuthor
            autherData ={authors}
            setauthor ={setauthor}
            setIsAdding={setIsAdding}
          />
        )}

        {/* For Editing page initially false */}
        {isEditing && (
          <EditAuthor
            autherData ={authors}
            setauthor ={setauthor}
            selectedAuther={selectedAuther}
            setIsEditing ={setIsEditing}
          />
        )}
       </Box>
        
       

    </React.Fragment>
  
  );
};

export default Authorpanel;
