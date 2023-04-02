import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export interface LoginState {
  isLogin: boolean;
  user: {
    picture: string;
    firstName: string;
    lastName: string;
    email: string;
  };
}

const initialState: LoginState = {
  isLogin: false,
  user: {
    picture: "",
    firstName: "",
    lastName: "",
    email: "",
  },
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    loginAction: (state, { payload }) => {
      state.isLogin = true;
      state.user = payload;
    },
    logoutAction: (state) => {
      state.isLogin = false;
    },
  },
});

export const login = async (dispatch: (arg0: any) => void) => {
  try {
    const response = await axios.get("users/me");
    if (response.data.user) {
      dispatch(loginAction(response.data.user));
    }
  } catch (err) {
    dispatch(logoutAction());
  }
};

// Action creators are generated for each case reducer function
export const { loginAction, logoutAction } = loginSlice.actions;

export default loginSlice.reducer;
