import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";

interface CommentState {
  totalComments: number;
}

const initialState: CommentState = {
  totalComments: 0,
};

const commentSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    setTotalComments(state, action: PayloadAction<number>) {
      state.totalComments = action.payload;
    },
  },
});

export const { setTotalComments } = commentSlice.actions;
export default commentSlice.reducer;
export const selectTotalComments = (state: RootState) =>
  state.comments.totalComments;
