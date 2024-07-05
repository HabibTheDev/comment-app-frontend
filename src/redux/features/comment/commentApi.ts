import baseApi from "../../api/baseApi";

const commentManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addComment: builder.mutation({
      query: ({ comment }) => {
        return {
          url: `/comment/`,
          method: "POST",
          body: comment,
        };
      },
      invalidatesTags: ["comment"],
    }),
    UpdateComment: builder.mutation({
      query: ({ comment, commentId }) => {
        return {
          url: `/comment/${commentId}`,
          method: "PUT",
          body: comment,
        };
      },
      invalidatesTags: ["comment"],
    }),
    deleteComment: builder.mutation({
      query: ({ commentId }) => {
        return {
          url: `/comment/${commentId}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["comment"],
    }),
  }),
});

export const {
  useAddCommentMutation,
  useDeleteCommentMutation,
  useUpdateCommentMutation,
} = commentManagementApi;
