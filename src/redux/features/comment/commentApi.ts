import baseApi from "../../api/baseApi";

const authManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addComment: builder.mutation({
      query: ({ comment, userId }) => {
        return {
          url: `/comment/add/${userId}`,
          method: "POST",
          body: comment,
        };
      },
      invalidatesTags: ["comment"],
    }),
  }),
});

export const { useAddCommentMutation } = authManagementApi;
