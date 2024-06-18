import { USERS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/login`, // Corrected this line
                method: 'POST',
                body: data
            }),
        }),
        register: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}`, // Corrected this line
                method: 'POST',
                body: data
            }),
        }),
        logout: builder.mutation({
            query: () => ({
                url: `${USERS_URL}/logout`, // Corrected this line
                method: 'POST',
            }),
        }),
    }),
});

export const { useLoginMutation, useLogoutMutation, useRegisterMutation } = usersApiSlice;
