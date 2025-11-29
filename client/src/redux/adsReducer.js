import { createSlice } from '@reduxjs/toolkit';
import { API_URL } from '../config';

const adsSlice = createSlice({
  name: 'ads',
  initialState: {
    list: [],
    loading: false,
    single: null,
  },
  reducers: {
    startLoading(state) {
      state.loading = true;
    },
    setAds(state, action) {
      state.list = action.payload;
      state.loading = false;
    },
    setSingle(state, action) {
      state.single = action.payload;
      state.loading = false;
    }
  }
});

export const fetchAds = () => async dispatch => {
  try {
    dispatch(startLoading());

    const res = await fetch(`${API_URL}/api/ads`);
    const data = await res.json();

    dispatch(setAds(data));
  } catch (err) {
    console.error("Error loading ads: ", err);
  }
};

export const fetchSingleAd = (id) => async dispatch => {
  try {
    dispatch(startLoading());

    const res = await fetch(`${API_URL}/api/ads/${id}`);
    const data = await res.json();

    dispatch(setSingle(data));
  } catch (err) {
    console.error("Error loading chosen ad: ", err);
  }
};

export const { startLoading, setAds, setSingle } = adsSlice.actions;
export default adsSlice.reducer;