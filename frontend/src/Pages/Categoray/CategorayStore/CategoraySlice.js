import { Try } from '@mui/icons-material';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../api/axiosConfig';

export const FetchCategoray = createAsyncThunk(
    'FetchCategoray',
    async (arg, { rejectWithValue }) => {
        try {

            const response = await axiosInstance.get('/category/catlist')
            return response.data

        } catch (error) {
            return rejectWithValue(error);
        }
    }

)

export const AddCategoray = createAsyncThunk(
    'AddCategoray',
    async (CatData, { rejectWithValue }) => {
        try {
            const response = await axiosInstance({
                method: 'post',
                url: '/category/addcat',
                data: CatData
            })
            console.log(`--------------response-------------`, response.data)
            CatData.id = response.data.resdata.insertId;
            return CatData
        } catch (error) {
            return rejectWithValue(error);
        }
    }

)

export const UpdateCategoray = createAsyncThunk(
    'UpdateCategoray',
    async ({id,CatData}, { rejectWithValue }) => {
        console.log(`--------------CatData-------------`, CatData)
        try {
            const response = await axiosInstance({
                method: 'put',
                url: `/category/updatecat/${id}`,
                data: CatData
            })
            console.log(`--------------response-------------`, response.data)
            CatData.id = id;
            return CatData
        } catch (error) {
            return rejectWithValue(error);
        }
    }

)

export const DeleteCategoray = createAsyncThunk(
    'DeleteCategoray',
    async (catId, { rejectWithValue }) => {
        try {
            const response = await axiosInstance({
                method: 'delete',
                url: `/category/deletecat/${catId}`
            })
            return response.data
        } catch (error) {
            return rejectWithValue(error);
        }
    }

)



const CategoraySlice = createSlice({
    name: 'CategoraySlice',

    initialState: {
        catData: [],
        IsAdding: false,
        IsEditing: false,
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
        [FetchCategoray.pending]: (state, action) => {
            state.loader = true;

        },
        [FetchCategoray.fulfilled]: (state, action) => {
            console.log('----------action--------', action)
            state.loader = false;
            state.catData = action.payload
        },
        [FetchCategoray.rejected]: (state, action) => {
            state.loader = true;
        },
        [AddCategoray.pending]: (state, action) => {
            state.loader = true;

        },
        [AddCategoray.fulfilled]: (state, action) => {
            console.log('----------action--------', action)
            state.loader = false;
            state.IsAdding = false;
            state.catData.push(action.payload);
        },
        [AddCategoray.rejected]: (state, action) => {
            state.loader = true;
        },
        [UpdateCategoray.pending]: (state, action) => {
            state.loader = true;

        },
        [UpdateCategoray.fulfilled]: (state, action) => {
            console.log('----------action--------', action)
            state.loader = false;
            state.IsEditing = false;
            state.catData = state.catData.filter((auth)=> auth.id !== action.payload)
            state.catData.push(action.payload);
        },
        [UpdateCategoray.rejected]: (state, action) => {
            state.loader = true;
        },
        [DeleteCategoray.pending]: (state, action) => {
            state.loader = true;

        },
        [DeleteCategoray.fulfilled]: (state, action) => {
            console.log('----------action delete --------', action)
            state.loader = false;
            state.catData = state.catData.filter((cat) => cat.id !== action.meta.arg)
            console.log(`--------state action-------`, action.meta.arg)
            console.log(`--------state-------`, state.catData)
            // return false 
        },
        [DeleteCategoray.rejected]: (state, action) => {
            state.loader = true;
        },
    },
})

export const { IsAddingOpen, IsAddingClose, IsEditingOpen, IsEditingClose } = CategoraySlice.actions
export default CategoraySlice.reducer;