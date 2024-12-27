import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const userApi = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:9996/api"
        , credentials: "include"



    }),

    endpoints: (builder) => ({

        getUser: builder.query({
            query: (token) => ({
                url: "/auth/user",
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
        }),


        registerUser: builder.mutation({
            query: (formData) => ({
                url: `/auth/signup`,
                method: "POST",


                body: formData,
            })
        }),


        loginUser: builder.mutation({
            query: (formData) => ({
                url: "/auth/login",
                method: "POST",
                body: formData
            })

        }),
        logout: builder.mutation({
            query: ({ token }) => ({
                url: "/auth/logout",
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })

        }),
        getUserYoutubeVideos: builder.query({
            query: ({ token, userId }: { token: string; userId: string }) => ({
                url: `/youtube/${userId}`,
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
        }),

        getUserViews: builder.query({
            query: ({ token }) => ({
                url: "view/videos",
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                }

            })
        })



    })
})





export const { useGetUserQuery, useRegisterUserMutation, useLoginUserMutation, useLogoutMutation, useGetUserYoutubeVideosQuery, useGetUserViewsQuery } = userApi;

