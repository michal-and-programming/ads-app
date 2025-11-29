import { createSlice } from '@reduxjs/toolkit';
import { API_URL } from '../config';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    login: null,
    avatar: null,
    phone: null,
    isLogged: false,
  },
 reducers: {
    setUser(state, action) {
      state.login = action.payload;
      state.isLogged = true;
    },
    logout(state) {
      state.login = null;
      state.isLogged = false;
    }
  }
});

export const checkUser = () => async dispatch => {
  try {
    const res = await fetch(`${API_URL}/auth/user`, {
      credentials: "include",
    });

    if (res.ok) {
      const data = await res.json();
      dispatch(setUser(data));
    }
  } catch (err) {
    console.log("User not logged in");
  }
};

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;