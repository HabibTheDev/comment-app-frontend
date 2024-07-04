import baseApi from "../../api/baseApi";

const authManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (userInfo) => {
        return {
          url: "/users/register",
          method: "POST",
          body: userInfo,
        };
      },
    }),
    loginUser: builder.mutation({
      query: (loginInfo) => {
        return {
          url: "/users/login",
          method: "POST",
          body: loginInfo,
        };
      },
    }),
  }),
});

export const { useRegisterUserMutation, useLoginUserMutation } =
  authManagementApi;
