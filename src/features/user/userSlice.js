import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAddress } from "../../services/apiGeocoding";
import { setLocalStorage } from "../../utils/helpers";

function getPosition() {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

// async function fetchAddress() {
//   // 1) We get the user's geolocation position
//   const positionObj = await getPosition();
//   const position = {
//     latitude: positionObj.coords.latitude,
//     longitude: positionObj.coords.longitude,
//   };

//   // 2) Then we use a reverse geocoding API to get a description of the user's address, so we can display it the order form, so that the user can correct it if wrong
//   const addressObj = await getAddress(position);
//   const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`;

//   // 3) Then we return an object with the data that we are interested in
//   return { position, address };
// }

export  const fetchAdress = createAsyncThunk("user/fetchAdress", async () => {
  // 1) We get the user's geolocation position
  const positionObj = await getPosition();
  const position = {
    latitude: positionObj.coords.latitude,
    longitude: positionObj.coords.longitude,
  };

  // 2) Then we use a reverse geocoding API to get a description of the user's address, so we can display it the order form, so that the user can correct it if wrong
  const addressObj = await getAddress(position)
  const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`;

  // 3) Then we return an object with the data that we are interested in
  // ! payload of the FULFILLED state
  return { position, address };
});

const initialState = {
  userName: "",
  status: "idle",
  position: {},
  address: "",
  error: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateName(state, action) {
      state.userName = action.payload;
      setLocalStorage('user', action.payload)
    }, 
  }, 
  extraReducers: (builder) =>
    builder
      .addCase(fetchAdress.pending, (state) => {
        state.status = "loading"; // Mutate draft directly without returning
        state.error = ''
      })

      .addCase(fetchAdress.fulfilled, (state, { payload }) => {
        state.status = "idle";
        state.position = payload.position;
        state.address = payload.address;
      })

      .addCase(fetchAdress.rejected, (state) => {
        state.status = "error";
        state.error = 'There was a problem getting your address. Make sure to fill this field!';
      }),
});

export const { updateName } = userSlice.actions;

export default userSlice.reducer;
