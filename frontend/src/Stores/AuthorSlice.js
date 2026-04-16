import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../api/axiosConfig';

export const fetchAuthor = createAsyncThunk(
    'getAuthor',
    async (arg, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get('/author/authlist');
            console.log('--------insde createAsyncThunk response---');
            console.log(response.data);
          
            return response.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);
export const AddAuthorData = createAsyncThunk(
    'AddAuthor',
    async (addAuthorInputData, { rejectWithValue }) => {
        console.log('insside AddAuthorData createAsyncThunk ');
        console.log(addAuthorInputData);
        try {
            const response = await axiosInstance.post('/author/addAuth', addAuthorInputData);
           // return response.data;
            addAuthorInputData.id = response.data.insertId;
            return addAuthorInputData;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);
export const DeleteAuthor = createAsyncThunk(
    'DeleteAuthor',
    async (autID, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.delete(`/author/deleteAuth/${autID}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);
export const UpdateAuthor = createAsyncThunk(
    'UpdateAuthor',
    async ({ID,Data}, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.put(`/author/updateAuth/${ID}`, Data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

const Authorslice = createSlice({
    name: 'AuthorR',
    initialState: {
        authData: [],
        IsAdding: false,
        IsEditing:false,
        loading: false,
        error: null,
    },
    reducers: {
        IsAddingOpen: (state, action) => {
            state.IsAdding = true
        },
        IsAddingClose: (state, action) => {
            state.IsAdding = false
        },
        IsEditingOpen: (state, action) => {
            state.IsEditing = true
        },
        IsEditingClose: (state, action) => {
            state.IsEditing = false
        },
    },
    extraReducers: {
        [fetchAuthor.pending]: (state) => {
            console.log('---inside pending---');
            state.loading = true;
        },
        [fetchAuthor.fulfilled]: (state, action) => {
            console.log('---inside fullfilled---');
            console.log(action.payload);
            state.loading = false;
            state.authData = action.payload;
        },
        [fetchAuthor.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload ? action.payload.message : 'An error occurred';
        },
        [DeleteAuthor.pending]: (state) => {
            state.loading = true;
        },
        [DeleteAuthor.fulfilled]: (state, action) => {
            state.loading = false;
            state.authData = state.authData.filter((auth) => auth.id !== action.payload.id);
        },
        [DeleteAuthor.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload ? action.payload.message : 'An error occurred';
        },
        [AddAuthorData.pending]: (state) => {
            state.loading = true;
        },
        [AddAuthorData.fulfilled]: (state, action) => {
            console.log(action.payload);
            console.log('-------state authData-------');
            console.log(state.authData);
            state.authData.push(action.payload);
            state.IsAdding = false;

        },
        [AddAuthorData.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload ? action.payload.message : 'An error occurred';
        },
        [UpdateAuthor.pending]: (state) => {
            state.loading = true;
        },
        [UpdateAuthor.fulfilled]: (state, action) => {
          
            state.authData.push(action.payload)
            state.IsEditing = false;
            console.log(action.payload)
           

        },
        [UpdateAuthor.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload ? action.payload.message : 'An error occurred';
        },
    },
});

export const { IsAddingOpen,IsAddingClose,IsEditingOpen,IsEditingClose } = Authorslice.actions
export default Authorslice.reducer;