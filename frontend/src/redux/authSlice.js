import {createSlice} from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    user:null,
    authChecked: false
  },
  reducers: {
   setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload
      state.authChecked = true;
    }
  }
});

export const { setLoading, setUser } = authSlice.actions;
export default authSlice.reducer;