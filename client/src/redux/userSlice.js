import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../api/axios";
import { toast } from "react-hot-toast";

//getclients
export const getClients = createAsyncThunk("/api/user/clients(get)",async(payload,{rejectWithValue})=>{
    try{
        const response = await axios.get("/api/user/clients",{
            headers : {
                "Content-Type" : "application/json"
            }
        })
        return response.data;
    }
    catch (err) {
        if (!err?.response) {
          throw err;
        }
        return rejectWithValue(err?.response?.data);
      }
})


//get individual client
export const getClient = createAsyncThunk("/api/user/clients/:id(get)",async(payload,{rejectWithValue})=>{
    try{
        const response = await axios.get(`/api/user/clients/${payload.id}`,{
            headers : {
                "Content-Type" : "application/json"
            }
        })
        return response.data;
    }
    catch (err) {
        if (!err?.response) {
          throw err;
        }
        return rejectWithValue(err?.response?.data);
      }
})

//add client
export const addClient = createAsyncThunk("/api/user/clients/:id(post)",async(payload,{rejectWithValue})=>{
    try{
        const response = await axios.post(`/api/user/clients`,payload,{
            headers : {
                "Content-Type" : "application/json"
            }
        })
        return response.data;
    }
    catch (err) {
        if (!err?.response) {
          throw err;
        }
        return rejectWithValue(err?.response?.data);
      }
})

//delete client
export const deleteClient = createAsyncThunk("/api/user/clients/:id(delete)",async(payload,{rejectWithValue})=>{
    try{
        const response = await axios.delete(`/api/user/clients/${payload.id}`,{
            headers : {
                "Content-Type" : "application/json"
            }
        })
        return response.data;
    }
    catch (err) {
        if (!err?.response) {
          throw err;
        }
        return rejectWithValue(err?.response?.data);
      }
})

//add branch
export const addBranch = createAsyncThunk("/api/user/branches/(post)",async(payload,{rejectWithValue})=>{
    try{
        const response = await axios.post(`/api/user/branches`,payload,{
            headers : {
                "Content-Type" : "application/json"
            }
        })
        return response.data;
    }
    catch (err) {
        if (!err?.response) {
          throw err;
        }
        return rejectWithValue(err?.response?.data);
      }
})


const userSlice = createSlice({
  name: "user",
  initialState: {
    user : {},
    clients : [],
    client : {},
    isLoading : false
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getClients.pending,(state)=>{
        state.isLoading = true
    })
    builder.addCase(getClients.fulfilled,(state,{payload})=>{
        state.isLoading = false;
        state.clients = payload.clients;
        toast.success(payload.message);
    })
    builder.addCase(getClients.rejected,(state,{payload})=>{
        state.isLoading = false;
        toast.error(payload?.message || "Unable to get clients details")
    })

    builder.addCase(getClient.pending,(state)=>{
        state.isLoading = true
    })
    builder.addCase(getClient.fulfilled,(state,{payload})=>{
        state.isLoading = false;
        state.client = payload.client;
        toast.success(payload.message);
    })
    builder.addCase(getClient.rejected,(state,{payload})=>{
        state.isLoading = false;
        toast.error(payload?.message || "Unable to get clients details")
    })

    builder.addCase(addClient.pending,(state)=>{
        state.isLoading = true
    })
    builder.addCase(addClient.fulfilled,(state,{payload})=>{
        state.isLoading = false;
        state.clients = payload.clients;
        toast.success(payload.message);
    })
    builder.addCase(addClient.rejected,(state,{payload})=>{
        state.isLoading = false;
        toast.error(payload?.message || "Unable to add client details")
    })

    builder.addCase(deleteClient.pending,(state)=>{
        state.isLoading = true
    })
    builder.addCase(deleteClient.fulfilled,(state,{payload})=>{
        state.isLoading = false;
        state.clients = payload.clients;
        toast.success(payload.message);
    })
    builder.addCase(deleteClient.rejected,(state,{payload})=>{
        state.isLoading = false;
        toast.error(payload?.message || "Unable to delete client details")
    })

    builder.addCase(addBranch.pending,(state)=>{
        state.isLoading = true;
    })
    builder.addCase(addBranch.fulfilled,(state,{payload})=>{
        state.isLoading = false;
        state.client = payload.client;
        toast.success(payload.message);
    })
    builder.addCase(addBranch.rejected,(state,{payload})=>{
        state.isLoading = false;
        toast.error(payload?.message || "Unable to add branch details")
    })

  }
});


export default userSlice.reducer;