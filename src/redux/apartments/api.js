import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const { REACT_APP_BASE_URL } = process.env;

export const apartmentApi = createApi({
  reduserPath: "apartmentApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${REACT_APP_BASE_URL}`,
  }),
  tagTypes: ["Apartments"],
  endpoints: (build) => ({
    getApartments: build.query({
      query: ({ rooms = "", price = "" }) => {
        let queryParams = "";
        if (rooms) {
          queryParams += `rooms=${rooms}`;
        }
        if (price) {
          queryParams += `${rooms ? "&" : ""}price=${price}`;
        }
        return `/apartments${queryParams && `?${queryParams}`}`;
      },
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Apartments", id })),
              { type: "Apartments", id: "LIST" },
            ]
          : [{ type: "Apartments", id: "LIST" }],
    }),
    getApartmentById: build.query({
      query: (id) => `/apartments${id}`,
    }),
    addApartment: build.mutation({
      query: (body) => ({
        url: "/apartments",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Apartments", id: "LIST" }],
    }),
    deleteApartment: build.mutation({
      query: (id) => ({
        url: `/apartments${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Apartments", id: "LIST" }],
    }),
  }),
});
export const {
  useGetApartmentsQuery,
  useGetApartmentByIdQuery,
  useAddApartmentMutation,
  useDeleteApartmentMutation,
} = apartmentApi;
