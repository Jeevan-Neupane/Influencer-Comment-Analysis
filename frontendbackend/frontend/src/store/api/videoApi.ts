import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const videoApi = createApi({
    reducerPath: "videoapi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://127.0.0.1:8000"



    }),

    endpoints: (builder) => ({




        getVideos: builder.mutation({
            query: (formData) => ({
                url: '/search',
                method: "POST",

                headers: {
                    "Allow-Control-Allow-Origin": "*",
                },

                body: formData,
            })
        }),

        getVideoData: builder.mutation({
            query: (videoId) => ({
                url: "process_video",
                method: "POST",
                headers: {
                    "Allow-Control-Allow-Origin": "*"
                },
                body: {
                    video_id: videoId
                }
            })
        }),
        getUserMediaData: builder.mutation({
            query: (formData: any) => ({
                url: '/contents',
                method: "POST",

                headers: {
                    "Allow-Control-Allow-Origin": "*",
                },

                body: formData,
            })

        })




    }),


})





export const { useGetVideosMutation, useGetVideoDataMutation, useGetUserMediaDataMutation } = videoApi;