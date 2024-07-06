import baseApi from "../../api/baseApi";

interface GetCommentsParams {
  sort?: "newest" | "mostLiked" | "mostDisliked";
  page?: number;
  limit?: number;
}

const commentManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllComment: builder.query({
      query: ({ sort = "newest", page = 1, limit = 10 }: GetCommentsParams) => {
        const params = new URLSearchParams({
          sort,
          page: page.toString(),
          limit: limit.toString(),
        }).toString();

        return {
          url: `/comment?${params}`,
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
      query: ({ commentId, comment }) => {
        return {
          url: `/comment/${commentId}`,
          method: "PUT",
          body: { comment },
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
    editReply: builder.mutation({
      query: ({ replyId, commentId, comment: reply }) => {
        return {
          url: `/comment/${commentId}/reply/${replyId}/edit`,
          method: "PUT",
          body: { reply },
        };
      },
      invalidatesTags: ["comment"],
    }),
    deleteReply: builder.mutation({
      query: ({ commentId, replyId }) => {
        return {
          url: `/comment/${commentId}/reply/${replyId}/delete`,
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
  useDeleteReplyMutation,
  useEditReplyMutation,
} = commentManagementApi;
