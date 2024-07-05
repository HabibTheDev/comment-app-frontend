import { createSlice } from "@reduxjs/toolkit";

export type TRegisterEmail = {
  email: string;
};

const initialState: TRegisterEmail = {
  email: "",
};

const registerEmailSlice = createSlice({
  name: "registerEmail",
  initialState,
  reducers: {
    setRegisterEmail: (state, action) => {
      const { email } = action.payload;
      state.email = email;
    },
  },
});

export const { setRegisterEmail } = registerEmailSlice.actions;
export default registerEmailSlice.reducer;
