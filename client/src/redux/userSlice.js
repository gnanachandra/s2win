import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../api/axios"
import { toast } from "react-hot-toast";

//getclients
export const getClients = createAsyncThunk(
  "/api/client(get)",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/client", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      
      return response.data;
    } catch (err) {
      if (!err?.response) {
        throw err;
      }
      return rejectWithValue(err?.response?.data);
    }
  }
);

//get individual client
export const getClient = createAsyncThunk(
  "/api/client/:id(get)",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/client/${payload.id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return response.data;
    } catch (err) {
      if (!err?.response) {
        throw err;
      }
      return rejectWithValue(err?.response?.data);
    }
  }
);

//add client
export const addClient = createAsyncThunk(
  "/api/client(post)",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.post(`/api/client`, payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return response.data;
    } catch (err) {
      if (!err?.response) {
        throw err;
      }
      return rejectWithValue(err?.response?.data);
    }
  }
);

//delete client
export const deleteClient = createAsyncThunk(
  "/api/client(delete)",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`/api/client/${payload.id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return response.data;
    } catch (err) {
      if (!err?.response) {
        throw err;
      }
      return rejectWithValue(err?.response?.data);
    }
  }
);

//add branch
export const addBranch = createAsyncThunk(
  "/api/branch/(post)",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.post(`/api/branch`, payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log("Add branch : ",response.data)
      return response.data;
    } catch (err) {
      if (!err?.response) {
        throw err;
      }
      return rejectWithValue(err?.response?.data);
    }
  }
);

export const getBranch = createAsyncThunk(
  "/api/branch/:id",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/branch/${payload.id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return response.data;
    } catch (err) {
      if (!err?.response) {
        throw err;
      }
      return rejectWithValue(err?.response?.data);
    }
  }
);

export const deleteBranch = createAsyncThunk(
  "/api/branch/:id(delete)",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`/api/branch/${payload.id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return response.data;
    } catch (err) {
      if (!err?.response) {
        throw err;
      }
      return rejectWithValue(err?.response?.data);
    }
  }
);

export const addPayment = createAsyncThunk(
  "/api/payment",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/payment", payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return response.data;
    } catch (err) {
      if (!err?.response) {
        throw err;
      }
      return rejectWithValue(err?.response?.data);
    }
  }
);

export const userLogin = createAsyncThunk(
  "/api/user/login",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/user/login", payload,{
        headers : {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
      });
      return response.data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

const token = localStorage.getItem("token")
const userSlice = createSlice({
  name: "user",
  initialState: {
    token : token,
    user: {},
    clients: [],
    client: {},
    branch: {},
    isLoading: false,
  },
  reducers: {},
  extraReducers: (builder) => {

    builder.addCase(userLogin.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(userLogin.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      localStorage.setItem("token", payload.accessToken);
      state.token = payload.accessToken;
      toast.success(payload.message);
    });
    builder.addCase(userLogin.rejected, (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload.message);
    });
    builder.addCase(getClients.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getClients.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.clients = payload.clients;
      toast.success(payload.message);
    });
    builder.addCase(getClients.rejected, (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload?.message || "Unable to get clients details");
    });

    builder.addCase(getClient.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getClient.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.client = payload.client;
      toast.success(payload.message);
    });
    builder.addCase(getClient.rejected, (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload?.message || "Unable to get clients details");
    });

    builder.addCase(addClient.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addClient.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.clients = payload.clients;
      toast.success(payload.message);
    });
    builder.addCase(addClient.rejected, (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload?.message || "Unable to add client details");
    });

    builder.addCase(deleteClient.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteClient.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.clients = payload.clients;
      toast.success(payload.message);
    });
    builder.addCase(deleteClient.rejected, (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload?.message || "Unable to delete client details");
    });

    builder.addCase(addBranch.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addBranch.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.client = payload.client;
      toast.success(payload.message);
    });
    builder.addCase(addBranch.rejected, (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload?.message || "Unable to add branch details");
    });

    builder.addCase(getBranch.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getBranch.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.branch = payload.branch;
      toast.success(payload.message);
    });
    builder.addCase(getBranch.rejected, (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload?.message || "Unable to get branch details");
    });

    builder.addCase(deleteBranch.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteBranch.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.client = payload.client;
      toast.success(payload.message);
    });
    builder.addCase(deleteBranch.rejected, (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload?.message || "Unable to delete branch details");
    });

    builder.addCase(addPayment.pending,(state)=>{
      state.isLoading = true;
    });
    builder.addCase(addPayment.fulfilled,(state,{payload})=>{
      state.isLoading = false;
      state.client = payload.client;
    })
    builder.addCase(addPayment.rejected,(state,{payload})=>{
      state.isLoading = false;
      toast.error(payload?.message || "Unable to add payment")
    })
  },
});

export default userSlice.reducer;
