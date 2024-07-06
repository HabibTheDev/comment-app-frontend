import baseApi from "../../api/baseApi";

const commentManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllComment: builder.query({
      query: () => {
        return {
          url: `/comment`,
          method: "GET",
        };
      },
      providesTags: ["comment"],
    }),

    addComment: builder.mutation({
      query: (comment) => {
        return {
          url: `/comment`,
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
    likeComment: builder.mutation({
      query: ({ commentId }) => {
        return {
          url: `/comment/like/${commentId}`,
          method: "PUT",
        };
      },
      invalidatesTags: ["comment"],
    }),
    disLikeComment: builder.mutation({
      query: ({ commentId }) => {
        return {
          url: `/comment/dislike/${commentId}`,
          method: "PUT",
        };
      },
      invalidatesTags: ["comment"],
    }),

    likeReply: builder.mutation({
      query: ({ commentId, replyId }) => {
        return {
          url: `/comment/${commentId}/reply/${replyId}/like`,
          method: "PUT",
        };
      },
      invalidatesTags: ["comment"],
    }),
    dislikeReply: builder.mutation({
      query: ({ commentId, replyId }) => {
        return {
          url: `/comment/${commentId}/reply/${replyId}/dislike`,
          method: "PUT",
        };
      },
      invalidatesTags: ["comment"],
    }),

    replyComment: builder.mutation({
      query: ({ comment: reply, commentId }) => {
        console.log(reply, commentId);
        return {
          url: `/comment/${commentId}/reply`,
          method: "POST",
          body: { reply },
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
  useGetAllCommentQuery,
  useLikeCommentMutation,
  useDisLikeCommentMutation,
  useReplyCommentMutation,
  useDislikeReplyMutation,
  useLikeReplyMutation,
} = commentManagementApi;
