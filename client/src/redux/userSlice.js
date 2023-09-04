import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../api/axios";
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


export const updateClient = createAsyncThunk(
  "/api/client(update)",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`/api/client/${payload.id}`, payload,{
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
      console.log("Add branch : ", response.data);
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

export const updateBranchDetails = createAsyncThunk(
  "/api/branch(update)",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`/api/branch/${payload.id}`, payload, {
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
      const response = await axios.post("/api/payment/all", payload, {
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

export const deletePayment = createAsyncThunk(
  "/api/payment(delete)",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`/api/payment/${payload.id}`, {
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

export const updatePayment = createAsyncThunk(
  "/api/payment(update)",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `/api/payment/${payload._id}`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
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
  "/api/auth/login",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/auth/login", payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
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

export const getAllPayments = createAsyncThunk(
  "/api/payment(all)",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/payment/all", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const getPaymentDetails = createAsyncThunk(
  "/api/payment/:id(get)",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/payment/${payload.id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
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

const token = localStorage.getItem("token");
const userSlice = createSlice({
  name: "user",
  initialState: {
    token: token,
    user: {},
    clients: [],
    payments: [],
    branches: [],
    payment: {},
    client: {},
    branch: {},
    isLoading: false,
  },
  reducers: {
    setPayment: (state, { payload }) => {
      console.log(payload.id);
      state.payment = state.payments.find((pay) => pay._id == payload.id);
    },
    updatePaymentFields: (state, { payload }) => {
      state.payment = { ...state.payment, [payload.field]: payload.value };
    },
    setBranch: (state, { payload }) => {
      state.branch = state.branches.find((branch) => branch._id == payload.id);
    },
    setClient: (state, { payload }) => {
      state.client = state.clients.find((client) => client._id == payload.id);
    },
  },
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
      state.payments = payload.client.payments;
      state.branches = payload.client.branches;
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

    builder.addCase(updateClient.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateClient.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.clients = payload.clients;
      toast.success(payload.message);
    });
    builder.addCase(updateClient.rejected, (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload?.message || "Unable to update client details");
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

    builder.addCase(updateBranchDetails.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateBranchDetails.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.client = payload.client;
      state.branches = payload.client.branches;
      toast.success(payload.message);
    });
    builder.addCase(updateBranchDetails.rejected, (state, { payload }) => {
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

    builder.addCase(addPayment.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addPayment.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.client = payload.client;
    });
    builder.addCase(addPayment.rejected, (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload?.message || "Unable to add payment");
    });

    builder.addCase(deletePayment.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deletePayment.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.client = payload.client;
      state.payments = payload.payments;
      toast.success(payload.message);
    });
    builder.addCase(deletePayment.rejected, (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload?.message || "Unable to delete payment");
    });

    builder.addCase(updatePayment.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updatePayment.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.payments = payload.payments;
      toast.success(payload.message);
    });
    builder.addCase(updatePayment.rejected, (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload?.message || "Unable to update payment");
    });

    builder.addCase(getAllPayments.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllPayments.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.payments = payload.payments;
    });
    builder.addCase(getAllPayments.rejected, (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload?.message || "Unable to get All payments");
    });

    builder.addCase(getPaymentDetails.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getPaymentDetails.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.payment = payload.payment;
    });
    builder.addCase(getPaymentDetails.rejected, (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload?.message || "Unable to get payment Details");
    });
  },
});

export const { setPayment, updatePaymentFields, setBranch, setClient } =
  userSlice.actions;

export default userSlice.reducer;
