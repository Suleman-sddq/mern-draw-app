
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import drawService from './drawService'


const initialState = {
   draw: [],
   allDrawsList: [],
   isLoading: false,
   isSuccess: false,
   isError: false,
   message: '',
   announceWinner: false
}


// Add new Draw
export const addDraw = createAsyncThunk('draw/addDraw', async (drawData, thunkAPI) => {
   try {
      return await drawService.addDraw(drawData)
   } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
      return thunkAPI.rejectWithValue(message);
   }
})

// Delete new Draw
export const deleteDraw = createAsyncThunk('draw/deleteDraw', async (id, thunkAPI) => {
   try {
      return await drawService.deleteDraw(id)
   } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
      return thunkAPI.rejectWithValue(message);
   }
})


// Get all pending Draws
export const getAllDraws = createAsyncThunk('draw/getAllDraws', async (_, thunkAPI) => {
   try {
      return await drawService.getAllDraws()
   } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
      return thunkAPI.rejectWithValue(message)
   }
})


// Get all Draws
export const getAllDrawsList = createAsyncThunk('draw/getAllDrawsList', async (_, thunkAPI) => {
   try {
      return await drawService.getAllDrawsList()
   } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
      return thunkAPI.rejectWithValue(message)
   }
})


// Get current Draw
export const getCurrentDraw = createAsyncThunk('draw/getCurrentDraw', async (_, thunkAPI) => {
   try {
      return await drawService.getCurrent()
   } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
      return thunkAPI.rejectWithValue(message)
   }
})

// Announce winner 
export const announceWinnerFun = createAsyncThunk('draw/announce', async (data, thunkAPI) => {
   try {
      return await drawService.announce(data)
   } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
      return thunkAPI.rejectWithValue(message)
   }
})



export const drawSlice = createSlice({
   name: 'drawSlice',
   initialState,
   reducers: {
      reset: (state) => state.initialState,

   },
   extraReducers: (builder) => {

      builder
         .addCase(addDraw.pending, (state) => {
            state.isLoading = true
         })
         .addCase(addDraw.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.draw.push(action.payload);
         })
         .addCase(addDraw.rejected, (state, action) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
            state.message = action.payload;
         })
         .addCase(getAllDraws.pending, (state) => {
            state.isLoading = true
         })
         .addCase(getAllDraws.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true;
            state.draw = action.payload
         })
         .addCase(getAllDraws.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true;
            state.isSuccess = false;
            state.message = action.payload;
         })
         .addCase(getAllDrawsList.pending, (state) => {
         })
         .addCase(getAllDrawsList.fulfilled, (state, action) => {
            state.allDrawsList = action.payload
         })
         .addCase(getAllDrawsList.rejected, (state, action) => {
            state.message = action.payload;
         })
         .addCase(deleteDraw.pending, (state) => {
            state.isLoading = true
         })
         .addCase(deleteDraw.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true;
            state.draw = state.draw.filter((dr) => dr._id !== action.payload.id)
         })
         .addCase(deleteDraw.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true;
            state.isSuccess = false;
            state.message = action.payload;
         })
         .addCase(getCurrentDraw.pending, (state) => {
            state.isLoading = true
         })
         .addCase(getCurrentDraw.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true;
            state.isError = false;
            state.announceWinner = false
            state.draw = action.payload
         })
         .addCase(getCurrentDraw.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true;
            state.isSuccess = false;
            state.message = action.payload;
         })
         .addCase(announceWinnerFun.pending, (state) => {

         })
         .addCase(announceWinnerFun.fulfilled, (state, action) => {
            state.announceWinner = true;
            state.allDrawsList.push(action.payload)

         })
         .addCase(announceWinnerFun.rejected, (state, action) => {
            state.announceWinner = false
            state.message = action.payload;
         })
   }

})

export const { reset } = drawSlice.actions
export default drawSlice.reducer
