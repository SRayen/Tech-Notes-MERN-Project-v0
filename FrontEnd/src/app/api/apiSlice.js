import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
    baseQuery:fetchBaseQuery({baseUrl: 'http://localhost:3500'}),
    //tagTypes: will be used for cached data
    tagTypes: ['Note' , 'User'],
    endpoints: builder =>({})
})

