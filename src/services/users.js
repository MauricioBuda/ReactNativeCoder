import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { URL_FIREBASE } from '../firebase/database'

export const usersApi = createApi({
    reducerPath:"usersApi",
    baseQuery:fetchBaseQuery({baseUrl:URL_FIREBASE}),
    tagTypes:["userImage","userLocation"],
    endpoints:(builder) => ({


        patchImageProfile:builder.mutation({
            query:({image,localId})=> ({
                url:`users/${localId}.json`,
                method:"PATCH",
                body:{image}
            }),
            invalidatesTags:["userImage"]
        }),


        postUserLocation:builder.mutation({
            query:({localId,userLocation})=> ({
                url:`users/${localId}/locations.json`,
                method:"POST",
                body:userLocation
            }),
            invalidatesTags:["userLocation"]
        }),


        putUserLocation: builder.mutation({
            query: ({ localId, userLocation }) => ({
                url: `users/${localId}/locations.json`,
                method: "PUT",
                body: userLocation
            }),
            invalidatesTags: ["userLocation"]
        }),


        getUser:builder.query({
            query:({localId})=> `users/${localId}.json`,
            transformResponse:(response) => {
        
                if(!response) return {image:"", locations:[], name: "", email: ""};
                if(!response.locations) response.locations = [];
                if(!response.image)  response.image = "";
                if(!response.name) response.name = "Nombre no disponible";
                if(!response.email) response.email = "Email no disponible";
        
                const data = Object.entries(response.locations).map(item => ({id:item[0],...item[1]}));
        
                return {
                    ...response,
                    locations: data,
                };
            },
            providesTags:["userImage","userLocation"]
        }),

    })
})

export const {  
                usePatchImageProfileMutation,
                usePostUserLocationMutation,
                useGetUserQuery,
                usePutUserLocationMutation
} = usersApi
